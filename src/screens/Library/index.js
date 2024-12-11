import React, { useEffect, useState } from "react";
import APIKit from "../../spotify";
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

export default function Library({ userName, token }) {
    const [playLists, setPlayLists] = useState(null);
    const [artists, setArtists] = useState(null);
    const [topArtists, setTopArtists] = useState(null);

    useEffect(() => {
        if (token) {
            APIKit.get("me/playlists")
                .then((response) => {
                    setPlayLists(response.data.items);
                    console.log(response);
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy playlist:", error);
                });
            // APIKit.get("me/following?type=artist&limit=20")
            //     .then((response) => {
            //         setArtists(response.data.artists.items);
            //         console.log("Nghệ sĩ theo dõi:", response.data.artists.items);
            //     })
            //     .catch((error) => {
            //         console.error("Lỗi khi lấy nghệ sĩ theo dõi:", error);
            //     });

            // APIKit.get("me/top/artists?limit=20")
            //     .then((response) => {
            //         setTopArtists(response.data.items);
            //         console.log("Nghệ sĩ top:", response.data.items);
            //     })
            //     .catch((error) => {
            //         console.error("Lỗi khi lấy nghệ sĩ top:", error);
            //     });
        }
    }, [token]);

    const navigate = useNavigate();

    const handleClick = (id, index) => {
        navigate("/player", {
            state: { id: id, index: index },
        });
        localStorage.setItem("currenPlaylistIndex", index);
    };

    const handleRemoveToken = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="screen-container flex magicpattern px-custom-x py-custom-y md:pb-7">
            {userName ? (
                <div className="w-full h-full mt-5 p-[3%] md:pt-0 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 overflow-y-auto ">
                    {playLists?.map((playlist, index) => (
                        <div
                            key={playlist?.id}
                            className="playListCard relative w-full h-full rounded-[20px] border border-solid border-[#3645622e] p-3.5 mb-[2%] bg-playlistCard-gradient transition-all duration-200 ease-in-out cursor-pointer hover:scale-102  "
                            onClick={() => handleClick(playlist?.id, index)}
                        >
                            <img
                                src={playlist?.images[0]?.url}
                                className="w-full rounded-xl"
                                alt="playListImage"
                            ></img>
                            <div className="py-2.5">
                                <p className=" font-semibold text-white">{playlist?.name}</p>
                                <p className="text-[#c4d0e37c] text-sm">
                                    {playlist?.tracks?.total} Bài hát
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
            ) : (
                <button
                    className="text-black  text-2xl m-auto bg-[#1abc54] px-10 py-3 rounded-3xl font-semibold hover:bg-[#3be477] hover:scale-105"
                    onClick={handleRemoveToken}
                >
                    Login
                </button>
            )}
        </div>
    );
}
