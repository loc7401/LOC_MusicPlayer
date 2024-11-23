import SidebarButton from "../../SidebarBtn";

import { AiFillLayout } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { IoLibrary } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

export default function Sidebar({ userName, image }) {
    const handleRemoveToken = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="w-[120px] h-full sm:flex hidden flex-col justify-between items-center">
            <div className="w-full flex flex-col items-center">
                <img
                    src={image}
                    alt="profile-image"
                    className="h-[50px] w-[50px] rounded-[50px] mt-7 mb-2"
                />
                <p className="self-center text-[#e5e7eb] text-center text-sm ">
                    {userName && <span className="font-Merienda">{`Chào ${userName}`}</span>}
                </p>

                <div className="mt-10">
                    <SidebarButton title={"Feed"} to={"/feed"} icon={<AiFillLayout />} />
                    <SidebarButton title={"Trending"} to={"/trending"} icon={<AiFillFire />} />
                    <SidebarButton title={"Player"} to={"/player"} icon={<AiFillCaretRight />} />
                    <SidebarButton title={"Artists"} to={"/artists"} icon={<AiFillHeart />} />
                    <SidebarButton title={"Library"} to={"/library"} icon={<IoLibrary />} />
                </div>
            </div>

            {/* <SidebarButton title={"Logout"} to={"/"} icon={<BiLogOut />} /> */}
            <div
                className={`w-20 h-20 cursor-pointer text-[#f8c9d0] rounded-[20px] flex justify-center items-center 
                flex-col my-[5px] mx-auto transition-all duration-300 ease-in-out hover:text-white ${
                    userName ? "flex" : "hidden"
                }`}
                onClick={handleRemoveToken}
            >
                <BiLogOut className="text-[32px]" />
                <p>Logout</p>
            </div>
        </div>
    );
}
