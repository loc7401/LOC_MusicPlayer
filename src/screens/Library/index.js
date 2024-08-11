import React, { useEffect, useState } from "react";
import APIKit from "../../spotify";
import "./library.css";

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
            <div className="library-body">
                {playLists?.map((playlist) => (
                    <div key={playlist.id} className="playListCard">
                        <img src={playlist.images[0].url} className="playListImage"></img>
                        <p className="playListName">{playlist.name}</p>
                        <p>{playlist.tracks.total} Bài hát</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
