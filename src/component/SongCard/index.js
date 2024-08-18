import styles from "./SongCard.module.scss";
import classNames from "classnames/bind";
import AlbumImage from "../Album/AlbumImage";
import AlbumInfor from "../Album/AlbumInfor";

const cx = classNames.bind(styles);
function SongCard({ album }) {
    return (
        <div className={cx("songCard-body")}>
            <AlbumImage url={album?.images[0]?.url} />
            <AlbumInfor album={album} />
        </div>
    );
}

export default SongCard;
