const { app } = require("electron");
const createWindow = require("./utils/createWindow");

if (require("electron-squirrel-startup")) {
    app.quit();
}

app.setLoginItemSettings({
    openAtLogin: true,
});

app.on("ready", () => {
    const { logs } = require("./utils/db");
    require("./utils/ipc");
    createWindow.main();
    logs.set(Date.now().toString(), {
        user: "System",
        data: "Process started",
    });
});

app.on("before-quit", () => {
    const { logs } = require("./utils/db");
    logs.set(Date.now().toString(), {
        user: "System",
        data: "Exiting, process stopped...",
    });
});
