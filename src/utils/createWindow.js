const { BrowserWindow, Tray, nativeImage, Menu, ipcMain } = require("electron");
const { logs } = require("./db");
const recordProcess = require("./recordProcess");
const msToTime = require("./msToTime");
module.exports = {
    main: () => {
        const win = new BrowserWindow({
            title: "Time Trekker",
            width: 700,
            height: 400,
            closable: false,
            resizable: false,
            minimizable: false,
            frame: false,
            alwaysOnTop: true,
            icon: nativeImage.createFromPath("src/icon.png"),
            webPreferences: {
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        });

        win.setAlwaysOnTop(true, "screen-saver");

        win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        win.on("ready-to-show", () => {
            logs.set(Date.now().toString(), {
                user: "System",
                data: "Window Rendered, choosing an account",
            });
        });
        win.on("close", (e) => {
            e.preventDefault();
        });

        const tray = new Tray(nativeImage.createFromPath("src/icon.png"));

        let hideable_win = false;
        tray.setToolTip("UwU");
        const setTrayInfo = (param) => {
            tray.setContextMenu(
                Menu.buildFromTemplate([
                    { label: `Open`, type: "normal" },
                    { type: "separator" },
                    {
                        label: `User: ${param?.user || "Not logged in"}`,
                        type: "normal",
                    },
                    {
                        label: `Active for: ${msToTime(param?.active || 0)}`,
                    },
                    { type: "separator" },
                    {
                        label: `Log out`,
                        type: "normal",
                        click: () => {
                            win.webContents.send("tray-logout-clicked");
                        },
                    },
                ])
            );
        };

        setTrayInfo();

        tray.on("click", () => {
            win.isVisible() && hideable_win ? win.hide() : win.show();
        });

        ipcMain.handle("tray-update-info", (_, data) => {
            if (data.user) hideable_win = true;
            setTrayInfo(data);
        });

        ipcMain.handle("user-record", (_, user) => {
            recordProcess(user, (d) => {
                setTrayInfo({
                    user,
                    active: d,
                });
            });
        });

        ipcMain.handle("window-hide", () => {
            win.hide();
        });
        ipcMain.handle("window-show", () => {
            win.show();
        });

        return {
            window: win,
            tray: tray,
        };
    },
};
