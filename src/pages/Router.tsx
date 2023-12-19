import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";
import Main from "./Main";

const Router = () => {
    return (
        <HashRouter>
            <Header />
            <div style={{ flexGrow: 1, overflowY: "auto" }}>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
            <Footer />
        </HashRouter>
    );
};

// Get the root div/element
const root = createRoot(document.getElementById("root"));
// Render the Router
root.render(<Router />);
