import ProgressCircle from "../ProgressCircle";
import WaveAnimation from "../../PlayerControls/WaveAnimation";
import Controls from "../../PlayerControls/Controls";
import classNames from "classnames/bind";
import styles from "./AudioPlayer.module.scss";

const cx = classNames.bind(styles);

function AudioPlayer({ currentTrack, isPlaying, currentIndex, setCurrentIndex, total }) {
    const artistNames = currentTrack?.artists?.map((artist) => artist.name).join(", ");

    return (
        <div className={cx("player-container")}>
            <div className={cx("player-left")}>
                <ProgressCircle
                    percentage={75}
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
                        <p className={cx("duration")}>1:35 </p>
                        <WaveAnimation isPlaying={isPlaying} />
                        <p className={cx("duration")}>1:35 </p>
                    </div>

                    <Controls
                    // isPlaying={isPlaying}
                    // setIsPlaying={setIsPlaying}
                    // handleNext={handleNext}
                    // handlePrev={handlePrev}
                    // total={total}
                    />
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
