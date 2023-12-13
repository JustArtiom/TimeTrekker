import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./accountCreation.css";
import DataInput from "../components/dataInput.jsx";
import Button from "../components/button.jsx";

export default () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const processButtonClick = async () => {
        if (!username || !password) return;
        window.api.createAccount(username, password).then((x) => {
            if (x) navigate("/");
        });
    };

    return (
        <div className="AccountCreationContainer">
            <p className="createAnAccount">Create an account</p>
            <DataInput
                id="username"
                type="text"
                required={true}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            >
                username
            </DataInput>
            <DataInput
                id="password"
                required={true}
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            >
                password
            </DataInput>
            <Button type="Primary" onClick={processButtonClick}>
                Create Account
            </Button>
        </div>
    );
};
