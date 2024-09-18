import React, { useEffect, useState } from "react";
import APIKit from "../../spotify";
import styles from "./Queue.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Queue({ tracks, setCurrentIndex, currentIndex, playListIndex }) {
    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const [playLists, setPlayLists] = useState(null);
    const [currentPlayList, setCurrentPlayList] = useState({});

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
            setCurrentPlayList(playLists[playListIndex]);
        }
    }, [playListIndex, playLists]);
    console.log(currentPlayList);
    return (
        <div className={cx("queue-container")}>
            <div className={cx("name-total-wrap")}>
                <p className={cx("playlist-name")}>{currentPlayList.name}</p>
                <p className={cx("playList-total")}>#{currentPlayList.tracks?.total} Bài hát</p>
            </div>

            <div className={cx("queue-list")}>
                {tracks?.map((element, index) => {
                    const artistNames = element?.track?.artists
                        ?.map((artist) => artist.name)
                        .join(", ");
                    const durationFormatted = formatDuration(element?.track.duration_ms);
                    const urlImage = element?.track?.album?.images[0]?.url;
                    return (
                        <div
                            key={index}
                            className={cx("queue-item", {
                                "active-track": currentIndex === index,
                            })}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <div className={cx("track-detail")}>
                                <span className={cx("track-numbering")}>{index + 1}</span>
                                <img className={cx("track-img")} src={urlImage} />
                                <div className={cx("name-artist-wrap")}>
                                    <p className={cx("track-name")}>{element?.track.name}</p>
                                    <p className={cx("track-artist")}>{artistNames}</p>
                                </div>
                            </div>

                            <p>{durationFormatted}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Queue;
