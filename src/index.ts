import { app, BrowserWindow } from "electron";
import windowManager from "./utils/windowManager";

if (require("electron-squirrel-startup")) {
    app.quit();
}

/** Create a main window handler to manage the main window easily */
const mainWindow = new windowManager();

/** Main process ran when the program is ready or started */
const mainProcess = async () => {
    // Create the window app
    mainWindow.createWindow();
    // Render the HTML file
    mainWindow.renderHTML();
    // Create tray for the app
    mainWindow.createTray();

    // Put the window on always on display with the highest priority
    // mainWindow.window.setAlwaysOnTop(true, "screen-saver")
    // Keep The window always on
    mainWindow.window.on("blur", () => {
        if (mainWindow.window.isAlwaysOnTop())
            mainWindow.window.setAlwaysOnTop(true, "screen-saver");
    });

    // Show the app to the user when react completes rendering
    mainWindow.window.on("ready-to-show", () => {
        mainWindow.window.show();
    });
};

/** Trigger the main process when the app is ready to be lauched */
app.on("ready", mainProcess);
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainProcess();
    }
});

/** Prevent app from closing or getting force killed by the user */
app.on("before-quit", (event) => {
    console.log("app quit");
    /** @todo save logs async of app exiting */
});
