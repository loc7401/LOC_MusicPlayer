import classNames from "classnames/bind";
import styles from "./AlbumImage.module.scss";

const cx = classNames.bind(styles);

function AlbumImage({ url }) {
    return (
        <div className={cx("albumImage")}>
            <img src={url} className={cx("albumImage-art")} alt="albumArt" />
            {/* <div className={cx("albumImage-shadow")}>
                <img src={url} className={cx("albumImage-shadow")} alt="shadow" />
            </div> */}
        </div>
    );
}

export default AlbumImage;
