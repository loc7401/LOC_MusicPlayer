import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import "./sidebarButton.css";

export default function SidebarButton(props) {
    const currentLocation = useLocation();
    const btnClass = `btn-body ${currentLocation.pathname === props.to ? "btn-body-active" : ""}`;
    return (
        <Link to={props.to}>
            <div className={btnClass}>
                <IconContext.Provider value={{ size: "32px", className: "btn-icon" }}>
                    {props.icon}
                    <p className="btn-title">{props.title}</p>
                </IconContext.Provider>
            </div>
        </Link>
    );
}
