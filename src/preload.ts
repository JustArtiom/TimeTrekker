import { contextBridge, ipcRenderer } from "electron";

export const electronAPI = {
    auth: {
        login: (data: { username: string; password: string }) =>
            ipcRenderer.invoke("auth:login", data),
        logout: async () => {},
    },

    in_browser: {
        open: (url: string) => ipcRenderer.invoke("browser:open", url),
    },
};

process.once("loaded", () => {
    contextBridge.exposeInMainWorld("eAPI", electronAPI);
});
