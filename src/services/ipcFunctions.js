const { ipcMain, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

function setupIPCFunctions(windows) {
    ipcMain.on("play-timer", () => {
        for (let i = 1; i < windows.length; i++) {
            windows[i].webContents.send("play-timer");
        }
    });

    ipcMain.on("stop-timer", () => {
        for (let i = 1; i < windows.length; i++) {
            windows[i].webContents.send("stop-timer");
        }
    });

    ipcMain.on("reset-timer", (event, resetHours, resetMinutes) => {
        for (let i = 1; i < windows.length; i++) {
            windows[i].webContents.send(
                "reset-timer",
                resetHours,
                resetMinutes
            );
        }
    });

    ipcMain.on("send-message", (_, message) => {
        for (let i = 1; i < windows.length; i++) {
            windows[i].webContents.send("send-message", message);
        }
    });

    ipcMain.on("clear-message", () => {
        for (let i = 1; i < windows.length; i++) {
            windows[i].webContents.send("clear-message");
        }
    });

    ipcMain.on("times", (event, resetHours, resetMinutes) => {
        for (let i = 1; i < windows.length; i++) {
            windows[i].webContents.send("times", resetHours, resetMinutes);
        }
    });

    ipcMain.handle("open-file-dialog", async (event) => {
        const result = await dialog.showOpenDialog({
            properties: ["openFile"],
            filters: [{ name: "Fichiers MP3", extensions: ["mp3"] }],
        });

        if (!result.canceled) {
            const filePath = result.filePaths[0];
            console.log("filepath : ", filePath);
            const fileName = path.basename(filePath); // Obtenir le nom de fichier
            const fileContent = fs.readFileSync(filePath, "binary"); // Lire le contenu du fichier

            return { file: fileContent, fileName };
        }

        return null;
    });
}

module.exports = setupIPCFunctions;
