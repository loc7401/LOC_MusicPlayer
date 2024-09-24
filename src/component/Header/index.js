import { useLocation } from "react-router-dom";

function Header() {
    const currentLocation = useLocation();
    return (
        <div
            className={`${
                currentLocation.pathname === "/player" ? "hidden" : "flex"
            } fixed w-full md:py-2 py-3 max-md:flex-row-reverse max-md:pl-12 flex-row justify-center items-center`}
        >
            <img className="w-[50px] md:mr-7 mr-3" src="https://i.imgur.com/Tx2OoNE.png"></img>
            <p className="text-white md:text-xl text-base text-center font-Merienda">
                Spotify - Trải Nghiệm Nghe Nhạc Luôn Gián Đoạn{" "}
            </p>
        </div>
    );
}

export default Header;
