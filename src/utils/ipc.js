const { ipcMain } = require("electron");
const { users, logs, record } = require("./db");

ipcMain.handle("db-save-user", async (_, username, password) => {
    if (await users.get(username)) return false;

    await users.set(username, {
        password: password,
        screenTime: {
            active: 0,
            idle: 0,
        },
    });

    await logs.set(Date.now().toString(), {
        user: "System",
        data: "Account created username: " + username,
    });

    return true;
});

ipcMain.handle("db-get-all-users", () => users.all());
ipcMain.handle("db-get-all-logs", () => logs.all());
ipcMain.handle("db-get-all-record", () => record.all());
ipcMain.handle("db-get-user", (_, name) => users.get(name));
ipcMain.handle("db-logs-set", (_, value) =>
    logs.set(Date.now().toString(), value)
);
