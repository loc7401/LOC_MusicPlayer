import styles from "./Queue.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Queue({ tracks, setCurrentIndex }) {
    return (
        <div className={cx("queue-container")}>
            <div className={cx("queue")}>
                <p className={cx("up-next")}>Up Next</p>
                <div className={cx("queue-list")}></div>
            </div>
        </div>
    );
}

export default Queue;
