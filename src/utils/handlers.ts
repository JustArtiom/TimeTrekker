import windowManager from "./windowManager";
import { ipcMain, shell } from "electron";

const setup = (mainWindow: windowManager) => {
    // Handle login process
    ipcMain.handle(
        "auth:login",
        (_, data: { username: string; password: string }) => {
            // Process data

            // Return if wrong

            // Run these if success
            // Set the window alwaysOnTop to false
            mainWindow.window.setAlwaysOnTop(false);
            // Hide the window...
            mainWindow.window.hide();
        }
    );

    ipcMain.handle("browser:open", (_, url: string) => shell.openExternal(url));
};

export default {
    setup,
};
