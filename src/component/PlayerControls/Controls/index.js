import classNames from "classnames/bind";
import styles from "./Controls.module.scss";
import { IconContext } from "react-icons";
import {
    AiFillPauseCircle,
    AiOutlineForward,
    AiOutlineBackward,
    AiFillPlayCircle,
} from "react-icons/ai";
import { IconName } from "react-icons/io5";
import { IoShuffle, IoRepeat } from "react-icons/io5";
const cx = classNames.bind(styles);

function Controls({
    isPlaying,
    setIsPlaying,
    handleNext,
    handlePrev,
    isRandomClick,
    setIsRandomClick,
    isRepeatClick,
    setIsRepeatClick,
}) {
    return (
        <IconContext.Provider value={{ size: "35px", color: "#C4D0E3" }}>
            <div className="flex m-0 md:w-1/2 w-3/4 justify-around">
                <div
                    className="flex items-center cursor-pointer hover:opacity-80 hover:scale-105 transform transition duration-150 ease-in-out"
                    onClick={() => setIsRandomClick(!isRandomClick)}
                >
                    <IoShuffle className={cx({ "repeat-active": isRandomClick })} />
                </div>

                <div className="flex w-12 h-12 rounded-3xl items-center justify-center cursor-pointer hover:scale-105 transition duration-150 ease-in-out">
                    <AiOutlineBackward onClick={handlePrev} />
                </div>

                <div
                    className="flex items-center cursor-pointer hover:opacity-80 hover:scale-105 transform transition duration-150 ease-in-out"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                </div>

                <div className="flex w-12 h-12 rounded-3xl items-center justify-center cursor-pointer hover:scale-105 transition duration-150 ease-in-out">
                    <AiOutlineForward onClick={handleNext} />
                </div>

                <div
                    className="flex items-center cursor-pointer hover:opacity-80 hover:scale-105 transform transition duration-150 ease-in-out"
                    onClick={() => setIsRepeatClick(!isRepeatClick)}
                >
                    <IoRepeat className={cx({ "repeat-active": isRepeatClick })} />
                </div>
            </div>
        </IconContext.Provider>
    );
}

export default Controls;
