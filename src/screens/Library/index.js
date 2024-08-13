import React, { useEffect, useState } from "react";
import APIKit from "../../spotify";
import styles from "./Library.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Library() {
    const [playLists, setPlayLists] = useState(null);

    useEffect(() => {
        APIKit.get("me/playlists").then((response) => {
            setPlayLists(response.data.items);
        });
    }, []);

    console.log(playLists);
    return (
        <div className="screen-container">
            <div className={cx("library-body")}>
                {playLists?.map((playlist) => (
                    <div key={playlist.id} className={cx("playListCard")}>
                        <img src={playlist.images[0].url} className={cx("playListImage")}></img>
                        <p className={cx("playListName")}>{playlist.name}</p>
                        <p>{playlist.tracks.total} Bài hát</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
