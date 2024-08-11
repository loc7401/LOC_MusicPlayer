import React from "react";
import { loginEndpoint } from "../../spotify";
import "./login.css";

export default function Login() {
    return (
        <div className="login-page">
            <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
                alt="logo"
                className="logo"
            />

            <a href={loginEndpoint}>
                <div className="login-btn">LOG IN</div>
            </a>
        </div>
    );
}
