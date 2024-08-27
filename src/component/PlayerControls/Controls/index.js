import classNames from "classnames/bind";
import styles from "./Controls.module.scss";
import { IconContext } from "react-icons";
import {
    AiFillPauseCircle,
    AiOutlineForward,
    AiOutlineBackward,
    AiFillPlayCircle,
} from "react-icons/ai";

const cx = classNames.bind(styles);

function Controls({ isPlaying, setIsPlaying, handleNext, handlePrev, total }) {
    return (
        <IconContext.Provider value={{ size: "35px", color: "#C4D0E3" }}>
            <div className={cx("control-wrapper")}>
                <div className={cx("action-btn")}>
                    <AiOutlineBackward onClick={handlePrev} />
                </div>

                <div className={cx("play-pause-btn")} onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
                </div>

                <div className={cx("action-btn")}>
                    <AiOutlineForward onClick={handleNext} />
                </div>
            </div>
        </IconContext.Provider>
    );
}

export default Controls;
