import React from "react";

import "./dataInput.css";

export default ({ children, ...input }) => {
    return (
        <div className="dataInput">
            <input {...input} placeholder="..." />
            <label htmlFor={input.id}>{children}</label>
        </div>
    );
};
