import { useState } from "react";
import styles from "./Queue.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Queue({ tracks, setCurrentIndex }) {
    console.log(tracks);
    const [selectedIndex, setSelectedIndex] = useState(0); // State để lưu trữ chỉ số của item được chọn

    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleClick = (index) => {
        setCurrentIndex(index);
        setSelectedIndex(index); // Cập nhật chỉ số được chọn khi một item được click
    };

    return (
        <div className={cx("queue-container")}>
            <div className={cx("queue")}>
                <p className={cx("up-next")}>Danh sách bài hát</p>
                <div className={cx("queue-list")}>
                    {tracks?.map((element, index) => {
                        const artistNames = element?.track?.artists
                            ?.map((artist) => artist.name)
                            .join(", ");
                        const durationFormatted = formatDuration(element?.track.duration_ms);

                        return (
                            <div
                                key={index}
                                className={cx("queue-item", {
                                    color1: selectedIndex === index,
                                })}
                                onClick={() => handleClick(index)}
                            >
                                <p
                                    className={cx("track-name")}
                                >{`${element?.track.name} - ${artistNames}`}</p>
                                <p>{durationFormatted}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Queue;
