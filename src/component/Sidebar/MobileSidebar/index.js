import { useState, useEffect, useRef } from "react";
import SidebarButton from "../../SidebarBtn";
import { AiFillLayout } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoLibrary } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
// import apiClient from "../../../spotify";

export default function MobileSidebar({ userName, image }) {
    const [isOpen, setIsOpen] = useState();
    const sidebarRef = useRef(null);

    const handleRemoveToken = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 100);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false); // Ẩn sidebar khi nhấp bên ngoài
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex sm:hidden fixed z-[999]">
            <button
                onClick={toggleSidebar}
                className="text-2xl cursor-pointer p-1 border-none text-[#9ca3af] fixed top-2 left-3 z-[9999]"
            >
                ☰
            </button>

            <div
                ref={sidebarRef}
                className={`bg-[#1c1e45] dark:bg-gray-800 h-[100vh] flex flex-col justify-between fixed left-[-250px] z-[99999] p-4 transition-all duration-300 ease-in-out text-white ${
                    isOpen && "left-[0px]"
                }`}
            >
                <ul className="space-y-2 font-medium" onClick={closeSidebar}>
                    <div className="w-full flex flex-col items-center mb-5">
                        <img
                            src={image}
                            alt="profile-image"
                            className="h-[50px] w-[50px] rounded-[50px] mt-2 mb-2"
                        />
                        <p className="self-center text-[#e5e7eb] w-full text-center text-sm ">
                            {userName && (
                                <span className="font-Merienda">{`Chào ${userName}`}</span>
                            )}
                        </p>
                    </div>
                    <li>
                        <SidebarButton title={"Feed"} to={"/feed"} icon={<AiFillLayout />} />
                    </li>
                    <li>
                        <SidebarButton title={"Trending"} to={"/trending"} icon={<AiFillFire />} />
                    </li>
                    <li>
                        <SidebarButton
                            title={"Player"}
                            to={"/player"}
                            icon={<AiFillCaretRight />}
                        />
                    </li>
                    <li>
                        <SidebarButton title={"Artists"} to={"/artists"} icon={<AiFillHeart />} />
                    </li>
                    <li>
                        <SidebarButton title={"Library"} to={"/library"} icon={<IoLibrary />} />
                    </li>
                </ul>
                <div
                    className={`w-20 h-20 cursor-pointer text-[#f8c9d0] rounded-[20px] ${
                        userName ? "flex" : "hidden"
                    }  justify-center items-center 
                        flex-col my-[5px] mx-auto transition-all duration-300 ease-in-out hover:text-white`}
                    onClick={handleRemoveToken}
                >
                    <BiLogOut className="text-[32px]" />
                    <p>Logout</p>
                </div>
            </div>

            <div className={`w-[100vw] h-[100vh] bg-[#111827cc] ${!isOpen && "hidden"}`}></div>
        </div>
    );
}
