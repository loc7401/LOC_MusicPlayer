import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

import Feed from "../Feed";
import Library from "../Library";
import Player from "../Player";
import Trending from "../Trending";
import Favorites from "../Favorites";
import Sidebar from "../../component/Sidebar";
import Login from "../Auth/login";
import { setClientToken } from "../../spotify";

const cx = classNames.bind(styles);

export default function Home() {
    const [token, setToken] = useState("");
    const [playListIndex, setPlayListIndex] = useState(0);
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;

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

    return !token ? (
        <Login />
    ) : (
        <Router>
            <div className={cx("main-body")}>
                <Sidebar />
                <Routes>
                    <Route
                        path="/library"
                        element={<Library setPlayListIndex={setPlayListIndex} />}
                    ></Route>
                    <Route path="/feed" element={<Feed />}></Route>
                    <Route
                        path="/player"
                        element={<Player playListIndex={playListIndex} />}
                    ></Route>
                    <Route path="/trending" element={<Trending />}></Route>
                    <Route path="/favorites" element={<Favorites />}></Route>
                </Routes>
            </div>
        </Router>
    );
}
