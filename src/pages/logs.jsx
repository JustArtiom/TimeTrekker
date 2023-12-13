import React, { useEffect, useState } from "react";

import "./logs.css";
import prettyDate from "../utils/prettyDate";

export default () => {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        new Promise(async (res, rej) => {
            const alllogs = [
                ...(await window.api.getAllLogs().then((x) => x.slice(-100))),
                ...(await window.api.getAllRecord().then((x) => x.slice(-100))),
            ]
                .sort((a, b) => parseInt(a.id) - parseInt(b.id))
                .reverse();
            setLogs(alllogs);
            res();
        });
    });
    return (
        <div className="logsContainer">
            <div>
                {logs.map((v) => {
                    return (
                        <p key={v.id}>
                            {prettyDate(new Date(parseInt(v.id)))}:{" "}
                            {v.value.data && v.value.user
                                ? `${v.value.user} -> ${v.value.data}`
                                : `${v.value.user} -> ${v.value.event} -> ${v.value.message}`}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};
