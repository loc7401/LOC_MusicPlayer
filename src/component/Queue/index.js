import React, { useEffect, useState } from "react";
import APIKit from "../../spotify";
import styles from "./Queue.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Queue({ tracks, setCurrentIndex, currentIndex, index }) {
    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const [playLists, setPlayLists] = useState(null);
    const [currentPlayList, setCurrentPlayList] = useState({});

    const currenPlaylistIndex = localStorage.getItem("currenPlaylistIndex");
    useEffect(() => {
        APIKit.get("me/playlists").then((response) => {
            setPlayLists(response.data.items);
            if (response.data.items.length > 0) {
                setCurrentPlayList(response.data.items[0]);
            }
        });
    }, []);

    useEffect(() => {
        if (playLists && playLists.length > 0) {
            setCurrentPlayList(playLists[currenPlaylistIndex]);
            localStorage.setItem("currentPlaylist", JSON.stringify(playLists[currenPlaylistIndex]));
        }
    }, [currenPlaylistIndex, playLists]);

    useEffect(() => {
        const _currentPlaylist = localStorage.getItem("currentPlaylist");
        if (_currentPlaylist) {
            setCurrentPlayList(JSON.parse(_currentPlaylist));
        }
    }, []);

    return (
        <div className="queue-container w-full h-full md:h-3/4 flex flex-col items-start justify-center">
            <div className="md:mb-5 mb-3 md:pl-2.5 p-0 flex flex-col max-md:items-center max-md:w-full">
                <p className="md:text-5xl text-3xl font-bold text-white m-0 font-Merienda">
                    {currentPlayList?.name}
                </p>
                <p className="m-0 text-sm text-[#9aa9c2] max-md:mt-1">
                    #{currentPlayList?.tracks?.total} Bài hát
                </p>
            </div>

            <div className="md:w-3/4 w-full md:pr-5 overflow-y-auto overflow-x-hidden items-start">
                {tracks?.map((element, index) => {
                    const artistNames = element?.track?.artists
                        ?.map((artist) => artist.name)
                        .join(", ");
                    const durationFormatted = formatDuration(element?.track.duration_ms);
                    const urlImage = element?.track?.album?.images[0]?.url;
                    return (
                        <div
                            key={index}
                            className={`w-full flex justify-between py-[6px] px-[10px] font-medium hover:bg-active-track hover:rounded-md cursor-pointer transition-all duration-200 ease-in-out ${
                                currentIndex === index
                                    ? "bg-active-track rounded-md text-track-orange"
                                    : "text-white"
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <div className="flex items-center justify-center max-w-[90%]">
                                <span className="mr-4 inline-block w-5 m-auto">{index + 1}</span>
                                <img
                                    className="w-[40px] h-[40px] rounded-[8px]"
                                    src={urlImage}
                                    alt="track-img"
                                />
                                <div className="overflow-hidden">
                                    <p className="m-0 py-0 px-[7px] text-nowrap text-base w-full overflow-hidden text-ellipsis">
                                        {element?.track.name}
                                    </p>
                                    <p className="m-0 py-0 px-[7px] text-nowrap text-sm text-[#9aa9c2]">
                                        {artistNames}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p>{durationFormatted}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Queue;
