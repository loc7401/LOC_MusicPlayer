import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "../sidebarButton";

import { AiFillLayout } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoLibrary } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import apiClient from "../../spotify";

export default function Sidebar() {
    const [image, setImage] = useState("https://i.imgur.com/PDcUbJR.jpg");

    useEffect(() => {
        apiClient.get("me").then((response) => {
            console.log(response.data.images[1]);
            setImage(response.data.images[1].url);
        });
    }, []);

    return (
        <div className="sidebar-container">
            <img src={image} alt="profile-image" className="profile-img" />

            <div>
                <SidebarButton title={"Feed"} to={"/feed"} icon={<AiFillLayout />} />
                <SidebarButton title={"Trending"} to={"/trending"} icon={<AiFillFire />} />
                <SidebarButton title={"Player"} to={"/player"} icon={<AiFillCaretRight />} />
                <SidebarButton title={"Favorites"} to={"/favorites"} icon={<AiFillHeart />} />
                <SidebarButton title={"Library"} to={"/library"} icon={<IoLibrary />} />
            </div>
            <SidebarButton title={"logout"} to={""} icon={<BiLogOut />} />
        </div>
    );
}
