const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });
    mainWindow.loadFile("mainWindow.html");

    const secondWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });
    secondWindow.loadFile("secondWindow.html");

    mainWindow.webContents.openDevTools();
    secondWindow.webContents.openDevTools();

    // Code pour la communication IPC
    ipcMain.on("button-clicked", (event, message) => {
        // Émettre l'événement vers la deuxième fenêtre
        secondWindow.webContents.send("button-clicked", message);
    });

    secondWindow.on("closed", () => {
        if (mainWindow) {
            mainWindow.close();
        }
    });
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    console.log(process.platform);
    if (process.platform !== "darwin") app.quit();
});
