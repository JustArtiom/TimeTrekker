const { app, powerMonitor } = require("electron");
const createWindow = require("./utils/createWindow");
const { logs } = require("./utils/db");
require("./utils/ipc");

if (require("electron-squirrel-startup")) {
    app.quit();
}

app.setLoginItemSettings({
    openAtLogin: true,
});

app.on("ready", () => {
    createWindow.main();
    logs.set(Date.now().toString(), {
        user: "System",
        data: "Process started",
    });
});

app.on("before-quit", () => {
    logs.set(Date.now().toString(), {
        user: "System",
        data: "Exiting, process stopped...",
    });
});
