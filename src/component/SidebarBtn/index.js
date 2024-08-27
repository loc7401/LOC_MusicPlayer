import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import classNames from "classnames/bind";
import styles from "./SidebarButton.module.scss";

const cx = classNames.bind(styles);

export default function SidebarButton(props) {
    const currentLocation = useLocation();

    const btnClass = cx({
        "btn-body": true,
        "btn-body-active": currentLocation.pathname === props.to,
    });

    return (
        <Link to={props.to}>
            <div className={btnClass}>
                <IconContext.Provider value={{ size: "32px", className: cx("btn-icon") }}>
                    {props.icon}
                    <p className={cx("btn-title")}>{props.title}</p>
                </IconContext.Provider>
            </div>
        </Link>
    );
}
