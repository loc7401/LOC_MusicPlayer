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
import { useState } from "react";
const cx = classNames.bind(styles);

function Controls({
    isPlaying,
    setIsPlaying,
    handleNext,
    handlePrev,
    total,
    setCurrentIndex,
    isRandomClick,
    setIsRandomClick,
    isRepeatClick,
    setIsRepeatClick,
}) {
    // const handleRandom = () => {
    //     const randomIndex = Math.floor(Math.random() * total.length);
    //     if (isRandomClick) {
    //         setCurrentIndex(randomIndex);
    //     }
    //     setIsRandomClick(!isRandomClick);
    //     console.log(isRandomClick);
    // };

    return (
        <IconContext.Provider value={{ size: "35px", color: "#C4D0E3" }}>
            <div className={cx("control-wrapper")}>
                <div className={cx("random-btn")} onClick={() => setIsRandomClick(!isRandomClick)}>
                    <IoShuffle className={cx({ "repeat-active": isRandomClick })} />
                </div>

                <div className={cx("action-btn")}>
                    <AiOutlineBackward onClick={handlePrev} />
                </div>

                <div className={cx("play-pause-btn")} onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                </div>

                <div className={cx("action-btn")}>
                    <AiOutlineForward onClick={handleNext} />
                </div>

                <div className={cx("repeat-btn")} onClick={() => setIsRepeatClick(!isRepeatClick)}>
                    <IoRepeat className={cx({ "repeat-active": isRepeatClick })} />
                </div>
            </div>
        </IconContext.Provider>
    );
}

export default Controls;
