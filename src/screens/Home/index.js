import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from "../Feed";
import Library from "../Library";
import Player from "../Player";
import Trending from "../Trending";
import Favorites from "../Favorites";
import Sidebar from "../../component/Sidebar/LargeSidebar";
import MobileSidebar from "../../component/Sidebar/MobileSidebar";
import Login from "../Auth/login";
import Header from "../../component/Header";
import { setClientToken } from "../../spotify";
import apiClient from "../../spotify";

export default function Home() {
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState("https://i.imgur.com/PDcUbJR.jpg");

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;
        console.log(hash);
        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
        } else {
            setToken(token);
            setClientToken(token);
        }
    }, []);

    useEffect(() => {
        apiClient.get("me").then((response) => {
            if (response) {
                setUserName(response.data.display_name);
                setImage(response.data.images[1].url);
            }
        });
    }, []);

    return !token ? (
        <Login />
    ) : (
        <Router>
            <div className="md:h-screen h-screen w-screen bg-[#6870ff45] rounded-[30px] flex">
                <Sidebar userName={userName} image={image} />
                <MobileSidebar userName={userName} />
                <div className="w-full flex">
                    <Header />
                    <Routes>
                        <Route path="/library" element={<Library />}></Route>
                        <Route path="/feed" element={<Feed />}></Route>
                        <Route path="/player" element={<Player />}></Route>
                        <Route path="/trending" element={<Trending />}></Route>
                        <Route path="/favorites" element={<Favorites />}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
