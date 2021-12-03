import './Login.css';
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { sendData } from "../api/sendHttpRequests";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

export class Login extends Component {

    failedResponseGoogle = (response) => {
        const element = document.getElementById("message");
        element.innerHTML = "Login failed! Please try again later";
    }

    successfulResponseGoogle = (response) => {
        try {
            const cookies = new Cookies();
            var session_data = sendData("http://localhost:3001/user_login", response.tokenId);
            setTimeout(() => {
                session_data
                    .then(response => {
                        cookies.set("session-data", response, {path:"/", httpOnly:true});
                        console.log(cookies.get("session-data"));
                    });
                document.getElementById("navigate").click();
            }, 300); // the server waits 300 milliseconds before clicking the link to ensure that the sendData method finishes running completely before loading the next page
        } catch (error) {
            const element = document.getElementById("message");
            element.innerHTML = "Login failed! Please try again later";
            console.error(error);
        }
    }

    render() {
        return (
            <div>
                <div id="app_details">
                    <h1>Application Name</h1>
                    <p>By logging in to your Google Account here, you are able to provide yourself increased privacy from Google's alogirthm by letting us visit many website under your name.
                        To ensure that you are completely comfortable in using our services, you are able to opt out of us loading some of the webistes on the list if you don't want.
                        <br /><br />
                        In addition to that, to ensure your privacy, the moment you close the app, all the data stored about you in our systems will be deleted, unless you decide otherwise.</p>
                </div>

                <div id="app_login">
                    <GoogleLogin
                        clientId="919197055743-cr391ut1ptdgkaj5e06tb8icgi1477di.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.successfulResponseGoogle}
                        onFailure={this.failedResponseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <p id="message"></p>
                    <Link id="navigate" to="/home" hidden/>
                </div>
            </div>
        )
    }
}

export default Login;

// Used this youtube tutorial to help me create the google login:
// https://www.youtube.com/watch?v=-OgU5EAcQmo