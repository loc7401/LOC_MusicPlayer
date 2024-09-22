import classNames from "classnames/bind";
import styles from "./ProgressCircle.module.scss";
import React, { useState, useEffect } from "react";

const cx = classNames.bind(styles);
const Circle = ({ color, percentage, size, strokeWidth }) => {
    const radius = size / 2 - 20;
    const circle = 2 * Math.PI * radius - 20;
    const strokePct = ((100 - Math.round(percentage)) * circle) / 100;

    return (
        <circle
            r={radius}
            cx="50%"
            cy="50%"
            fill="transparent"
            stroke={strokePct !== circle ? color : ""}
            strokeWidth={strokeWidth}
            strokeDasharray={circle}
            strokeDashoffset={percentage ? strokePct : 0}
            strokeLinecap="round"
        ></circle>
    );
};

function ProgressCircle({ percentage, isPlaying, image, color }) {
    const [size, setSize] = useState(500);

    useEffect(() => {
        const updateSize = () => {
            setSize(window.innerWidth < 600 ? 300 : 500);
        };

        window.addEventListener("resize", updateSize);
        updateSize(); // Gọi ngay khi component được mount

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div className={cx("progress-circle")}>
            <svg className="md:m-0 mt-9" width={size} height={size}>
                <svg width={size} height={size}>
                    <g>
                        <Circle strokeWidth={"0.3rem"} color={"#3B4F73"} size={size} />
                        <Circle
                            strokeWidth={"0.4rem"}
                            color={color}
                            percentage={percentage}
                            size={size}
                        />
                    </g>

                    <defs>
                        <clipPath id="myCircle">
                            <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#FFFF"></circle>
                        </clipPath>

                        <clipPath id="myInnerCircle">
                            <circle cx="50%" cy="50%" r={size / 2 - 100} fill="#FFFF"></circle>
                        </clipPath>
                    </defs>

                    <image
                        className={cx("active")}
                        x={30}
                        y={30}
                        width={2 * (size / 2 - 30)}
                        height={2 * (size / 2 - 30)}
                        href="https://i.imgur.com/F63V2as.png"
                        clipPath={"url(#myCircle)"}
                        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                    />
                    <image
                        className={cx("active")}
                        x={100}
                        y={100}
                        width={2 * (size / 2 - 100)}
                        height={2 * (size / 2 - 100)}
                        href={image}
                        clipPath={"url(#myInnerCircle)"}
                        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                    />
                </svg>
            </svg>
        </div>
    );
}

export default ProgressCircle;
