import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from "../Feed";
import Library from "../Library";
import Player from "../Player";
import Trending from "../Trending";
import Favorites from "../Artists";
import Sidebar from "../../component/Sidebar/LargeSidebar";
import MobileSidebar from "../../component/Sidebar/MobileSidebar";
import Login from "../Auth/login";
import Header from "../../component/Header";
import { setClientToken } from "../../spotify";
import apiClient from "../../spotify";

export default function Home() {
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState("https://i.imgur.com/4GOMOrd.png");

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;
        console.log(hash);
        if (!token && hash) {
            const _token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token", _token);
            setToken(_token);
            setClientToken(_token);
            window.location.hash = ""; // Xóa hash khỏi URL
            window.location.reload();
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

    const handleRemoveToken = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return !token ? (
        <Login />
    ) : (
        <Router>
            <div className="md:h-screen h-screen w-screen bg-[#6870ff45] rounded-[30px] flex">
                <Sidebar userName={userName} image={image} />
                <MobileSidebar userName={userName} image={image} />
                <div className="w-full flex">
                    <Header userName={userName} />
                    {!userName ? (
                        <div className="m-auto flex flex-col items-center">
                            <img
                                className="w-1/2 mb-5 "
                                src="https://i.imgur.com/Tx2OoNE.png"
                                alt="logo"
                            ></img>
                            <button
                                className="text-black text-l bg-white px-8 py-3 rounded-3xl font-semibold hover:bg-[#3be477] hover:scale-105"
                                onClick={handleRemoveToken}
                            >
                                Login
                            </button>
                        </div>
                    ) : (
                        <Routes>
                            <Route
                                path="/library"
                                element={<Library userName={userName} token={token} />}
                            ></Route>
                            <Route path="/feed" element={<Feed />}></Route>
                            <Route path="/player" element={<Player />}></Route>
                            <Route path="/trending" element={<Trending />}></Route>
                            <Route path="/artists" element={<Favorites />}></Route>
                        </Routes>
                    )}
                </div>
            </div>
        </Router>
    );
}
