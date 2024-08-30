import classNames from "classnames/bind";
import styles from "./AlbumInfor.module.scss";

const cx = classNames.bind(styles);
function AlbumInfor({ album }) {
    const artist = [];
    album?.artists?.map((element) => {
        artist.push(element.name);
    });
    return (
        <div className={cx("albumInfor-container")}>
            <div className={cx("albumName")}>
                <div className={cx("slide-text")}>
                    <p>{`${album?.name} - ${artist.join(", ")}`}</p>
                </div>
            </div>

            <div className={cx("albumRelease")}>
                <p>{`Ngày phát hành: ${album?.release_date} \u2022 ${album?.type} \u2022 ${album?.album_type}`}</p>
            </div>
        </div>
    );
}

export default AlbumInfor;
