const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

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

    ipcMain.handle("open-file-dialog", async (event) => {
        const result = await dialog.showOpenDialog({
            properties: ["openFile"],
            filters: [{ name: "Fichiers MP3", extensions: ["mp3"] }],
        });

        if (!result.canceled) {
            const filePath = result.filePaths[0];
            const fileName = path.basename(filePath); // Obtenir le nom de fichier
            const fileContent = fs.readFileSync(filePath, "binary"); // Lire le contenu du fichier

            return { file: fileContent, fileName };
        }

        return null;
    });
}

module.exports = setupIPCFunctions;
