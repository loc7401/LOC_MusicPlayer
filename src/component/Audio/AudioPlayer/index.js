import ProgressCircle from "../ProgressCircle";
import WaveAnimation from "../../PlayerControls/WaveAnimation";
import Controls from "../../PlayerControls/Controls";
import classNames from "classnames/bind";
import styles from "./AudioPlayer.module.scss";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function AudioPlayer({ currentTrack, currentIndex, setCurrentIndex, total }) {
    const artistNames = currentTrack?.artists?.map((artist) => artist.name).join(", ");

    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);

    var audioSrc = total[currentIndex]?.track.preview_url;

    const audioRef = useRef(new Audio(total[0]?.track.preview_url));

    const intervalRef = useRef();

    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const currentPercent = duration ? (trackProgress / duration) * 100 : 0;

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current = new Audio(audioSrc);
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);

        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    }, [currentIndex]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    const handleNext = () => {
        if (currentIndex < total.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handlePrev = () => {
        if (currentIndex - 1 < 0) {
            setCurrentIndex(total.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const addZero = (n) => {
        return n > 9 ? n : `0${n}`;
    };

    return (
        <div className={cx("player-container")}>
            <div className={cx("player-left")}>
                <ProgressCircle
                    percentage={currentPercent}
                    isPlaying={true}
                    image={currentTrack?.album?.images[0]?.url}
                    size={300}
                    color="#c96850"
                />
            </div>

            <div className={cx("player-right")}>
                <p className={cx("song-title")}>{currentTrack?.name}</p>
                <p className={cx("song-artist")}>{artistNames}</p>

                <div className={cx("player-control")}>
                    <div className={cx("song-duration")}>
                        <p className={cx("duration")}>0:{addZero(Math.round(trackProgress))} </p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className={cx("duration")}>0:30 </p>
                    </div>

                    <Controls
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        total={total}
                    />
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
