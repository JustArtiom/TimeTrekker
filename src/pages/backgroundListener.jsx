import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.api.onTrayLogout(async () => {
            if (!sessionStorage.getItem("name")) return;
            await window.api.stopRecording();
            sessionStorage.clear("name");
            navigate("/");
            window.api.show();
        });
    }, []);

    return <></>;
};
