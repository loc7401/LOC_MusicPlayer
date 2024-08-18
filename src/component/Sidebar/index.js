import React, { useEffect, useState } from "react";
import SidebarButton from "../SidebarButton";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";

import { AiFillLayout } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoLibrary } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import apiClient from "../../spotify";

const cx = classNames.bind(styles);

export default function Sidebar() {
    const [image, setImage] = useState("https://i.imgur.com/PDcUbJR.jpg");

    useEffect(() => {
        apiClient.get("me").then((response) => {
            setImage(response.data.images[1].url);
        });
    }, []);

    const logOutBtn = () => {
        localStorage.clear();

        // Tải lại trang
        window.location.reload();
        console.log("loc");
    };

    return (
        <div className={cx("sidebar-container")}>
            <img src={image} alt="profile-image" className={cx("profile-img")} />

            <div>
                <SidebarButton title={"Feed"} to={"/feed"} icon={<AiFillLayout />} />
                <SidebarButton title={"Trending"} to={"/trending"} icon={<AiFillFire />} />
                <SidebarButton title={"Player"} to={"/player"} icon={<AiFillCaretRight />} />
                <SidebarButton title={"Favorites"} to={"/favorites"} icon={<AiFillHeart />} />
                <SidebarButton title={"Library"} to={"/library"} icon={<IoLibrary />} />
            </div>
            <SidebarButton title={"Logout"} to={"/"} icon={<BiLogOut />} />
            {/* <button onClick={() => logOutBtn()}>logout</button> */}
        </div>
    );
}
