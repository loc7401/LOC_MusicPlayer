import classNames from "classnames/bind";
import styles from "./WaveAnimation.module.scss";

const cx = classNames.bind(styles);

function WaveAnimation({ isPlaying }) {
    const boxes = Array.from({ length: 13 }, (_, index) => index + 1).map((num) => {
        const boxClasses = cx({
            box: true,
            active: isPlaying,
            [`box${num}`]: true,
        });

        return <div key={num} className={boxClasses} />;
    });

    return <div className={cx("box-container")}>{boxes}</div>;
}
export default WaveAnimation;
