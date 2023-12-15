import { electronAPI } from "./preload";

declare global {
    // Declare globally the eAPI from the context bridge of preload
    interface Window {
        eAPI: typeof electronAPI;
    }
}
