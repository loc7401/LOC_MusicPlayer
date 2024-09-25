import { useState, useEffect, useRef } from "react";
import SidebarButton from "../../SidebarBtn";

import { AiFillLayout } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoLibrary } from "react-icons/io5";
// import apiClient from "../../../spotify";

export default function MobileSidebar() {
    const [isOpen, setIsOpen] = useState();
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
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
    console.log(isOpen);
    return (
        <div className="flex fixed z-[999]">
            <button
                onClick={toggleSidebar}
                className="text-2xl cursor-pointer p-1 border-none text-[#9ca3af] fixed top-2 left-3 z-[9999]"
            >
                ☰
            </button>

            <div
                ref={sidebarRef}
                className={`bg-[#1c1e45] dark:bg-gray-800 h-[100vh] fixed left-[-250px] z-[99999] p-4 transition-all duration-300 ease-in-out text-white ${
                    isOpen ? "left-[0px]" : ""
                }`}
            >
                <ul className="space-y-2 font-medium">
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
                        <SidebarButton
                            title={"Favorites"}
                            to={"/favorites"}
                            icon={<AiFillHeart />}
                        />
                    </li>
                    <li>
                        <SidebarButton title={"Library"} to={"/library"} icon={<IoLibrary />} />
                    </li>
                </ul>
            </div>

            <div className={`w-[100vw] h-[100vh] bg-[#111827cc] ${isOpen ? "" : "hidden"}`}></div>
        </div>
    );
}
