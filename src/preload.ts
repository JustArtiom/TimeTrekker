import { contextBridge, ipcRenderer } from "electron";

export const electronAPI = {
    desktop: true,
    //   getProfile: () => ipcRenderer.invoke('auth:get-profile'),
    //   logOut: () => ipcRenderer.send('auth:log-out'),
    //   getPrivateData: () => ipcRenderer.invoke('api:get-private-data'),
};

process.once("loaded", () => {
    contextBridge.exposeInMainWorld("eAPI", electronAPI);
});
