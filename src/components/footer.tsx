import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import config from "../config";

export default () => {
    return (
        <p
            style={{
                textAlign: "right",
                padding: "4px",
                fontSize: "12px",
                opacity: "25%",
            }}
        >
            Made by JustArtiom{" "}
            <span
                className="clickable"
                title={config.contact.github}
                onClick={() => {
                    window.eAPI.in_browser.open(config.contact.github);
                }}
            >
                <FaGithub size={12} />
            </span>{" "}
            <span
                className="clickable"
                title={config.contact.instagram}
                onClick={() => {
                    window.eAPI.in_browser.open(config.contact.instagram);
                }}
            >
                <FaInstagram size={12} />
            </span>
        </p>
    );
};
