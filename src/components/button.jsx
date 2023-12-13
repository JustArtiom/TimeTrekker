import React from "react";

import "./button.css";

export default ({ children, type, ...buttonData }) => {
    return (
        <button
            {...buttonData}
            className={`default_button ${
                type === "Primary" ? "Primary_BTN" : ""
            }`}
        >
            {children}
        </button>
    );
};
