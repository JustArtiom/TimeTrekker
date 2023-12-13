const { app, powerMonitor, ipcMain, ipcRenderer } = require("electron");
const { record, users } = require("./db");
const prettyDate = require("./prettyDate");

module.exports = (user, cb) => {
    let playtime = 0;
    let idle = 0;
    let afk = false;

    record.set(Date.now().toString(), {
        user: user,
        event: "start",
        message: "Started playing at " + prettyDate(new Date()),
        timestamp: Date.now(),
    });

    let interval = setInterval(() => {
        if (powerMonitor.getSystemIdleTime() >= 60) {
            if (!afk) {
                record.set(Date.now().toString(), {
                    user: user,
                    event: "afk",
                    message: "Went afk at " + prettyDate(new Date()),
                    timestamp: Date.now(),
                });
            }
            console.log(`${user} afk`);
            idle += 60 * 1000;
            afk = true;
            return;
        }

        if (afk) {
            record.set(Date.now().toString(), {
                user: user,
                event: "btk", // back to keyboard
                message: "Came back at " + prettyDate(new Date()),
                timestamp: Date.now(),
            });
            afk = false;
        }

        playtime += 60 * 1000;
        cb(playtime);
    }, 60 * 1000);

    const processLogout = async () => {
        if (!user) return;
        console.log("user stopped recording");
        await record.set(Date.now().toString(), {
            user: user,
            event: "stop",
            message: "stopped playing at " + prettyDate(new Date()),
            timestamp: Date.now(),
        });
        await users.add(user + ".screenTime.active", playtime);
        await users.add(user + ".screenTime.idle", idle);
        clearInterval(interval);
    };

    ipcMain.handleOnce("user-stop-record", processLogout);
    app.on("before-quit", processLogout);
};
