import { useLocation } from "react-router-dom";

function Header({ userName }) {
    const currentLocation = useLocation();

    return (
        <div
            className={`${
                currentLocation.pathname === "/player" && window.innerWidth <= 500 && userName
                    ? "hidden"
                    : "flex"
            } fixed w-full md:py-2 py-3 max-md:flex-row-reverse max-md:pl-12 flex-row justify-center items-center`}
        >
            <img className="w-[40px] md:mr-7 mr-3" src="https://i.imgur.com/Tx2OoNE.png"></img>
            <p className="text-white md:text-xl text-base text-center font-Merienda">
                Spotify - Trải Nghiệm Nghe Nhạc Luôn Gián Đoạn
            </p>
        </div>
    );
}

export default Header;
