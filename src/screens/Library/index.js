import React, { useEffect, useState } from "react";
import APIKit from "../../spotify";
import styles from "./Library.module.scss";
import classNames from "classnames/bind";
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function Library() {
    const [playLists, setPlayLists] = useState(null);

    useEffect(() => {
        APIKit.get("me/playlists").then((response) => {
            setPlayLists(response.data.items);
        });
    }, []);

    const navigate = useNavigate();
    const playPlaylist = (id) => {
        navigate("/player", { state: { id: id } });
    };

    return (
        <div className="screen-container magicpattern">
            <div className={cx("library-body")}>
                {playLists?.map((playlist) => (
                    <div
                        key={playlist.id}
                        className={cx("playListCard")}
                        onClick={() => playPlaylist(playlist.id)}
                    >
                        <img src={playlist.images[0].url} className={cx("playListImage")}></img>
                        <p className={cx("playListName")}>{playlist.name}</p>
                        <p className={cx("playListSong")}>{playlist.tracks.total} Bài hát</p>
                        <div className={cx("playlist-fade")}>
                            <IconContext.Provider value={{ size: "50px", color: "E99D72" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
