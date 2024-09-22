import classNames from "classnames/bind";
import styles from "./AlbumImage.module.scss";

const cx = classNames.bind(styles);

function AlbumImage({ url }) {
    return (
        <div className={cx("albumImage")}>
            <img
                src={url}
                className="md:w-full w-7/12 md:rounded-t-3xl md:m-0 mt-9 rounded-3xl blur-xs brightness-75"
                alt="albumArt"
            />
        </div>
    );
}

export default AlbumImage;
