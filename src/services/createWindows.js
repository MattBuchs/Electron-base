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
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    windows.secondWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    if (displays.length === 2) {
        const secondScreen = displays[1];

        windows.secondWindow.setPosition(
            secondScreen.bounds.x,
            secondScreen.bounds.y
        );
    }

    if (displays.length === 3) {
        const thirdScreen = displays[2];

        windows.thirdWindow = new BrowserWindow({
            width: 1200,
            height: 800,
            x: thirdScreen.bounds.x,
            y: thirdScreen.bounds.y,
            fullscreen: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        windows.thirdWindow.loadFile("src/html/secondWindow.html");
    }

    windows.mainWindow.loadFile("src/html/mainWindow.html");
    windows.secondWindow.loadFile("src/html/secondWindow.html");

    windows.mainWindow.webContents.openDevTools();
    windows.secondWindow.webContents.openDevTools();
}

module.exports = createWindows;
