import React from "react";
import { loginEndpoint } from "../../spotify";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";

const cx = classNames.bind(styles);
export default function Login() {
    return (
        <div className={cx("login-page")}>
            <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
                alt="logo"
                className={cx("logo")}
            />

            <a href={loginEndpoint}>
                <div className={cx("login-btn")}>LOG IN</div>
            </a>
        </div>
    );
}
