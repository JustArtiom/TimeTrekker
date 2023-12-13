import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

import "./accountRow.css";
import msToTime from "../utils/msToTime";

export default ({ account, ...props }) => {
    useEffect(() => {
        const ctx = document.getElementById(`graph-${account.id}`);

        const today = new Date();
        let last7Days = Array.from({ length: 7 }, (_, index) => {
            const day = new Date(today);
            day.setDate(today.getDate() - index);
            return day.toLocaleDateString("en-US", { weekday: "short" });
        }).reverse();

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: last7Days,
                datasets: [
                    {
                        label: "Hours",
                        data: [0, 8, 16, 24, 12, 20, 4],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 8,
                        },
                        max: 24,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }, []);

    return (
        <div className="accountRowContainer" {...props}>
            <div className="accountInfoContainer">
                <div>{account.id}</div>
                <div className="accountPlaytimeInfo">
                    <p>
                        Online
                        <br />
                        {msToTime(account.value.screenTime.active)}
                    </p>
                    <p>
                        Idle <br />
                        {msToTime(account.value.screenTime.idle)}
                    </p>
                    <p>
                        Total <br />0
                    </p>
                </div>
            </div>
            <div className="graphContainer">
                <canvas id={`graph-${account.id}`} height={90}></canvas>
            </div>
        </div>
    );
};
