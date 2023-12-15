import { BrowserWindow, Tray, nativeImage } from "electron";
import config from "../../src/config";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class windowManager {
    readonly native_icon = nativeImage.createFromPath(config.logo_path);
    readonly defaultWindowOptions: Electron.BrowserWindowConstructorOptions = {
        icon: this.native_icon,
        width: 700,
        height: 400,
        frame: false,
        show: false, // Turns true when React done rendering
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    };

    window!: BrowserWindow;
    tray!: Tray;

    /** Create main window */
    createWindow = (options?: Electron.BrowserWindowConstructorOptions) => {
        this.window = new BrowserWindow(options || this.defaultWindowOptions);

        return this.window;
    };

    /** Render the entry HTML file */
    renderHTML = (dir?: string) => {
        if (!this.window) throw new Error("No window openned yet");
        this.window.loadURL(dir || MAIN_WINDOW_WEBPACK_ENTRY);

        return;
    };

    /** Create tray */
    createTray = () => {
        this.tray = new Tray(this.native_icon);

        return this.tray;
    };
}
