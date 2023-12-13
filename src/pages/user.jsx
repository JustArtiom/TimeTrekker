import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./user.css";

export default () => {
    const navigate = useNavigate();
    const name = sessionStorage.getItem("name");
    if (!name) navigate("/");

    useEffect(() => {
        (async () => {
            const theuser = await window.api.getUser(name);
            if (!theuser) navigate("/");

            window.api.sendLog({
                user: name,
                data: "Logged in at " + window.api.prettyDate(new Date()),
            });
            window.api.hide();
            window.api.updateTray({ user: name });
            window.api.startRecording(name);
        })();
    }, []);

    return (
        <div className="userContainer">
            <p className="WelcomeMessage unselectable_content">
                Welcome <span>{name}</span>
            </p>
            {window.api.prettyDate(new Date())}
        </div>
    );
};
