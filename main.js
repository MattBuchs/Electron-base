const { app, BrowserWindow, ipcMain, screen } = require("electron");

let mainWindow;
let secondWindow;

const createWindow = () => {
    const displays = screen.getAllDisplays();
    const mainScreen = displays[0];

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        x: mainScreen.bounds.x,
        y: mainScreen.bounds.y,
        center: true,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });
    mainWindow.loadFile("mainWindow.html");

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
        secondWindow.loadFile("secondWindow.html");

        secondWindow.webContents.openDevTools();
    } else {
        // Si un seul écran, afficher la deuxième fenêtre à côté de la première
        secondWindow = new BrowserWindow({
            width: 800,
            height: 600,
            fullscreen: true,
            webPreferences: { nodeIntegration: true, contextIsolation: false },
        });
        secondWindow.loadFile("secondWindow.html");

        secondWindow.webContents.openDevTools();
    }

    mainWindow.webContents.openDevTools();

    ipcMain.on("button-clicked", (event, message) => {
        secondWindow.webContents.send("button-clicked", message);
    });

    ipcMain.on("play-timer", () => {
        secondWindow.webContents.send("play-timer");
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
