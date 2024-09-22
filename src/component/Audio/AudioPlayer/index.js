import ProgressCircle from "../ProgressCircle";
import WaveAnimation from "../../PlayerControls/WaveAnimation";
import Controls from "../../PlayerControls/Controls";
import AlbumImage from "../../Album/AlbumImage";
import classNames from "classnames/bind";
import styles from "./AudioPlayer.module.scss";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function AudioPlayer({ currentTrack, currentIndex, setCurrentIndex, total, album }) {
    const artistNames = currentTrack?.artists?.map((artist) => artist.name).join(", ");

    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);

    const [isRandomClick, setIsRandomClick] = useState(false);
    const [isRepeatClick, setIsRepeatClick] = useState(false);

    var audioSrc = total[currentIndex]?.track.preview_url;

    const audioRef = useRef(new Audio(total[0]?.track.preview_url));

    const intervalRef = useRef();

    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const currentPercent = duration ? (trackProgress / duration) * 100 : 0;

    const randomIndex = Math.floor(Math.random() * total.length);

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                if (isRepeatClick) {
                    audioRef.current.pause();
                    audioRef.current = new Audio(audioSrc);
                    audioRef.current.play();
                } else {
                    handleNext();
                }
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };

    useEffect(() => {
        if (audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        } else {
            if (isPlaying) {
                audioRef.current = new Audio(audioSrc);
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
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
            if (isRandomClick) {
                setCurrentIndex(randomIndex);
            } else {
                setCurrentIndex(currentIndex + 1);
            }
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

    const artist = [];
    album?.artists?.map((element) => {
        artist.push(element.name);
    });

    return (
        <div className="flex md:w-4/6 md:m-0 mb-2.5 w-full flex-col justify-betwee items-center bg-[#8d8d9159] rounded-[20px]">
            <div className={cx("progress-circle")}>
                <ProgressCircle
                    percentage={currentPercent}
                    isPlaying={isPlaying}
                    image={currentTrack?.album?.images[0]?.url}
                    size={500}
                    color="#1ed760"
                />
                <AlbumImage url={currentTrack?.album?.images[0]?.url} />
            </div>

            <div className="p-4 w-full flex flex-col items-center">
                <p className={cx("song-artist")}>{`${album?.name} - ${artist.join(", ")}`}</p>
                <Controls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    total={total}
                    setCurrentIndex={setCurrentIndex}
                    isRandomClick={isRandomClick}
                    setIsRandomClick={setIsRandomClick}
                    isRepeatClick={isRepeatClick}
                    setIsRepeatClick={setIsRepeatClick}
                />
            </div>
        </div>
    );
}

export default AudioPlayer;
