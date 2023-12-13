import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";

import AccountSelection from "./accountSelection.jsx";
import Header from "../components/header.jsx";
import Credits from "../components/credits.jsx";
import AccountCreation from "./accountCreation.jsx";
import User from "./user.jsx";
import BackgroundListener from "./backgroundListener.jsx";
import Logs from "./logs.jsx";

const Router = () => {
    return (
        <HashRouter>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Header />
                <div
                    style={{
                        overflow: "auto",
                        width: "100%",
                        height: "305px",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<AccountSelection />} />
                        <Route path="/signup" element={<AccountCreation />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/logs" element={<Logs />} />
                    </Routes>
                </div>
                <Credits />
                <BackgroundListener />
            </div>
        </HashRouter>
    );
};

const root = createRoot(document.getElementById("root"));

root.render(<Router />);
