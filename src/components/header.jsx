import React, { useEffect } from "react";
import { FaClipboardList, FaRegHeart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import "./header.css";

export default (prop) => {
    const navigate = useNavigate();
    let name = sessionStorage.getItem("name");

    return (
        <div className="headerContainer">
            <div
                className={`LogoContainer unselectable_content ${
                    name || "HoverableLogo"
                }`}
            >
                <p
                    onClick={() => {
                        if (name) navigate("/user");
                        else navigate("/");
                    }}
                >
                    {name || "Not logged in"}
                </p>
            </div>
            <div className="LogsContainer">
                <p
                    onClick={() => {
                        navigate("/logs");
                    }}
                >
                    <FaClipboardList size={20} />
                </p>
                {!name ? (
                    ""
                ) : (
                    <p
                        onClick={async () => {
                            await window.api.stopRecording();
                            sessionStorage.clear("name");
                            navigate("/");
                        }}
                    >
                        <IoIosLogOut size={20} />
                    </p>
                )}
                <p>
                    <FaRegHeart size={20} />
                </p>
            </div>
        </div>
    );
};
