const { ipcMain } = require("electron");

function setupIPCFunctions(windows) {
    ipcMain.on("play-timer", () => {
        windows.secondWindow.webContents.send("play-timer");
    });

    ipcMain.on("stop-timer", () => {
        windows.secondWindow.webContents.send("stop-timer");
    });

    ipcMain.on("reset-timer", (event, resetMinutes) => {
        windows.secondWindow.webContents.send("reset-timer", resetMinutes);
    });

    ipcMain.on("send-message", (_, message) => {
        windows.secondWindow.webContents.send("send-message", message);
    });

    ipcMain.on("clear-message", () => {
        windows.secondWindow.webContents.send("clear-message");
    });

    ipcMain.on("minutes", (event, resetMinutes) => {
        windows.secondWindow.webContents.send("minutes", resetMinutes);
    });
}

module.exports = setupIPCFunctions;
