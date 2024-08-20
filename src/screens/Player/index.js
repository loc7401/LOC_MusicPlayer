import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../component/SongCard";
import Queue from "../../component/Queue";
import AudioPlayer from "../../component/Audio/AudioPlayer";
import classNames from "classnames/bind";
import styles from "./Player.module.scss";

const cx = classNames.bind(styles);

export default function Player() {
    const location = useLocation();
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (location.state) {
            apiClient
                .get(`https://api.spotify.com/v1/playlists/${location.state.id}/tracks`)
                .then((res) => {
                    console.log(res);
                    setTracks(res.data.items);
                    setCurrentTrack(res.data.items[0].track);
                });
        }
    }, [location.state]);

    useEffect(() => {
        setCurrentTrack(tracks[currentIndex]?.track);
    }, [currentIndex, tracks]);

    useEffect(() => {
        const savedTracks = localStorage.getItem("tracks");
        if (savedTracks) {
            setTracks(JSON.parse(savedTracks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tracks", JSON.stringify(tracks));
    }, [tracks]);

    return (
        <div className="screen-container magicpattern d-flex">
            <div className={cx("player-body-left")}>
                <AudioPlayer
                    currentTrack={currentTrack}
                    total={tracks}
                    isPlaying={true}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />
            </div>
            <div className={cx("player-body-right")}>
                <SongCard album={currentTrack?.album} />
                <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
            </div>
        </div>
    );
}
