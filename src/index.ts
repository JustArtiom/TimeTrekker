import { awaitDatabaseToBeAbleToLoad, initTables } from "./utils/db";
import { app, BrowserWindow } from "electron";
import windowManager from "./utils/windowManager";
import handlers from "./utils/handlers";

if (require("electron-squirrel-startup")) {
    app.quit();
}

/** Create a main window handler to manage the main window easily */
const mainWindow = new windowManager();

/** Main process ran when the program is ready or started */
const mainProcess = async () => {
    // Await for database connection
    // Known issue on some devices not allowing to open files in the first ms after booting up
    const db = await awaitDatabaseToBeAbleToLoad();

    // Init the tables if it's the first time when the app is open and the tables dont exist
    initTables(db);

    // Create the window app
    mainWindow.createWindow();
    // Render the HTML file
    mainWindow.renderHTML();
    // Create tray for the app
    mainWindow.createTray();

    // Put the window on always on display with the highest priority
    mainWindow.window.setAlwaysOnTop(true, "screen-saver");
    mainWindow.window.on("blur", () => {
        // Check if the window is already set as always on top and if it is
        // Keep The window always on top of other apps
        if (mainWindow.window.isAlwaysOnTop()) {
            // Set an interval so other windows with the same always on top priority doesnt go on top of the app
            const itrvl = setInterval(() => {
                mainWindow.window.setAlwaysOnTop(true, "screen-saver");
            }, 100);
            // Set a handler to clear the interval when the user focuses back on the window
            mainWindow.window.once("focus", () => {
                clearInterval(itrvl);
            });
        }
    });

    // Show the app to the user when react completes rendering
    mainWindow.window.on("ready-to-show", () => {
        mainWindow.window.show();
    });

    // Prevent the user from navigating without using the navigation buttons on the app
    mainWindow.window.webContents.on("will-navigate", (event) => {
        event.preventDefault();
    });

    // Setup the event handlers for the eAPI
    handlers.setup(mainWindow);
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
