import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

import "./credits.css";

export default () => {
    return (
        <p className="CreditsTitle">
            Made by JustArtiom{" "}
            <span>
                <FaGithub />
            </span>{" "}
            <span>
                <FaInstagram />
            </span>
        </p>
    );
};
