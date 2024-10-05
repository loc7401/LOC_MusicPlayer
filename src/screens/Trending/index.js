import React from "react";
import styles from "../../component/Globalstyles";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Trending() {
    return (
        <div className="flex justify-center items-center bg-deep-blue round-[30px] overflow-hidden magicpattern">
            <p className="text-white font-Merienda text-4xl">Trending is comming soon!...</p>
        </div>
    );
}
