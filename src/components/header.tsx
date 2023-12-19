import React, { useEffect } from "react";
import { FaClipboardList, FaRegHeart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import "./header.css";

export default () => {
    const navigate = useNavigate();
    let username = sessionStorage.getItem("username");

    return (
        <div className="headerContainer">
            <p
                className="headerTitle unselectable clickable"
                onClick={() => {
                    if (username) navigate("/user");
                    else navigate("/");
                }}
            >
                {username || "Not logged in"}
            </p>
            <div className="NavIcons">
                <p
                    onClick={() => {
                        navigate("/logs");
                    }}
                >
                    <FaClipboardList size={20} />
                </p>
                {username && (
                    <p
                        onClick={async () => {
                            await window.eAPI.auth.logout();
                            sessionStorage.removeItem("name");
                            navigate("/");
                        }}
                    >
                        <IoIosLogOut size={20} />
                    </p>
                )}
            </div>
        </div>
    );
};
