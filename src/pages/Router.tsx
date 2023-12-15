import React from "react";
import { createRoot } from "react-dom/client";

const Router = () => {
    return <div>Hello from react</div>;
};

// Get the root div/element
const root = createRoot(document.getElementById("root"));
// Render the Router
root.render(<Router />);
