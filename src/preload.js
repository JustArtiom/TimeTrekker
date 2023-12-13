// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require("electron");
const prettyDate = require("./utils/prettyDate");

contextBridge.exposeInMainWorld("api", {
    createAccount: async (username, password) =>
        ipcRenderer.invoke("db-save-user", username, password),
    getAllAccounts: async () => ipcRenderer.invoke("db-get-all-users"),
    getAllLogs: () => ipcRenderer.invoke("db-get-all-logs"),
    getAllRecord: () => ipcRenderer.invoke("db-get-all-record"),
    getUser: (name) => ipcRenderer.invoke("db-get-user", name),
    sendLog: (value) => ipcRenderer.invoke("db-logs-set", value),
    /** @param dt Date */
    prettyDate: prettyDate,
    hide: () => ipcRenderer.invoke("window-hide"),
    show: () => ipcRenderer.invoke("window-show"),
    updateTray: (data) => ipcRenderer.invoke("tray-update-info", data),
    startRecording: (user) => ipcRenderer.invoke("user-record", user),
    stopRecording: () => ipcRenderer.invoke("user-stop-record"),
    onTrayLogout: (cb) => ipcRenderer.on("tray-logout-clicked", cb),
});
