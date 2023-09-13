const { BrowserWindow, screen } = require("electron");

function createWindows(windows) {
    const displays = screen.getAllDisplays();
    const mainScreen = displays[0];

    windows.mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        x: mainScreen.bounds.x,
        y: mainScreen.bounds.y,
        center: true,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });
    windows.mainWindow.loadFile("app/src/html/mainWindow.html");

    if (displays.length >= 2) {
        const secondScreen = displays[1];

        windows.secondWindow = new BrowserWindow({
            width: 800,
            height: 600,
            fullscreen: true,
            x: secondScreen.bounds.x,
            y: secondScreen.bounds.y,
            webPreferences: { nodeIntegration: true, contextIsolation: false },
        });
        windows.secondWindow.loadFile("app/src/html/secondWindow.html");

        windows.secondWindow.webContents.openDevTools();
    } else {
        // Si un seul écran, afficher la deuxième fenêtre à côté de la première
        windows.secondWindow = new BrowserWindow({
            width: 800,
            height: 600,
            fullscreen: true,
            webPreferences: { nodeIntegration: true, contextIsolation: false },
        });
        windows.secondWindow.loadFile("app/src/html/secondWindow.html");

        windows.secondWindow.webContents.openDevTools();
    }
    windows.mainWindow.webContents.openDevTools();
}

module.exports = createWindows;
