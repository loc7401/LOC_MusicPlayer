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

    const handleClick = (id, index) => {
        navigate("/player", {
            state: { id: id, index: index },
        });
    };
    return (
        <div className="screen-container magicpattern px-custom-x py-custom-y sm:p-0">
            <div className="w-full h-full p-[3%] grid grid-cols-2 md:grid-cols-6 gap-4 overflow-y-auto ">
                {playLists?.map((playlist, index) => (
                    <div
                        key={playlist.id}
                        className="playListCard relative w-full h-full rounded-[20px] border border-solid border-[#3645622e] p-3.5 mb-[2%] bg-playlistCard-gradient transition-all duration-200 ease-in-out cursor-pointer hover:scale-102  "
                        onClick={() => handleClick(playlist.id, index)}
                    >
                        <img
                            src={playlist.images[0].url}
                            className="w-full rounded-xl"
                            alt="playListImage"
                        ></img>
                        <div className="py-2.5">
                            <p className=" font-semibold text-white">{playlist.name}</p>
                            <p className="text-[#c4d0e37c] text-sm">
                                {playlist.tracks.total} Bài hát
                            </p>
                        </div>

                        <div className="playlist-fade absolute opacity-0 right-0 bottom-0 w-full h-[24%] rounded-2xl bg-playlistFade-gradient flex items-end justify-end p-[8%] transition-all duration-500 ease">
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
