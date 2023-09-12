const { app, BrowserWindow, ipcMain, screen } = require("electron");
require("electron-reload")(__dirname, { ignored: [/\.json$/] });

let mainWindow;
let secondWindow;

const createWindow = () => {
    const displays = screen.getAllDisplays();
    const mainScreen = displays[0];

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        x: mainScreen.bounds.x,
        y: mainScreen.bounds.y,
        center: true,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });
    mainWindow.loadFile("html/mainWindow.html");

    if (displays.length >= 2) {
        const secondScreen = displays[1];

        secondWindow = new BrowserWindow({
            width: 800,
            height: 600,
            fullscreen: true,
            x: secondScreen.bounds.x,
            y: secondScreen.bounds.y,
            webPreferences: { nodeIntegration: true, contextIsolation: false },
        });
        secondWindow.loadFile("html/secondWindow.html");

        secondWindow.webContents.openDevTools();
    } else {
        // Si un seul écran, afficher la deuxième fenêtre à côté de la première
        secondWindow = new BrowserWindow({
            width: 800,
            height: 600,
            fullscreen: true,
            webPreferences: { nodeIntegration: true, contextIsolation: false },
        });
        secondWindow.loadFile("html/secondWindow.html");

        secondWindow.webContents.openDevTools();
    }
    mainWindow.webContents.openDevTools();

    ipcMain.on("play-timer", () => {
        secondWindow.webContents.send("play-timer");
    });

    ipcMain.on("stop-timer", () => {
        secondWindow.webContents.send("stop-timer");
    });

    ipcMain.on("reset-timer", (event, resetMinutes) => {
        secondWindow.webContents.send("reset-timer", resetMinutes);
    });

    ipcMain.on("send-message", (_, message) => {
        secondWindow.webContents.send("send-message", message);
    });

    ipcMain.on("clear-message", () => {
        secondWindow.webContents.send("clear-message");
    });

    ipcMain.on("minutes", (event, resetMinutes) => {
        secondWindow.webContents.send("minutes", resetMinutes);
    });

    mainWindow.on("closed", () => {
        if (secondWindow) {
            secondWindow.close();
        }
    });
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") app.quit();
    });
});
