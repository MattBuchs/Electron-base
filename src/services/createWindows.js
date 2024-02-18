const { BrowserWindow, screen } = require("electron");
const path = require("path");
const icon = path.join(__dirname, "../../public/img/AngelsGame.ico");

function createWindows() {
    const displays = screen.getAllDisplays();
    const mainScreen = screen.getPrimaryDisplay();
    let x = 0;

    const windows = displays.map((display, index) => {
        if (index === 0) {
            return new BrowserWindow({
                width: 1200,
                height: 800,
                x: mainScreen.bounds.x,
                y: mainScreen.bounds.y,
                center: true,
                icon,
                webPreferences: {
                    devTools: true,
                    nodeIntegration: true,
                    contextIsolation: false,
                    enableRemoteModule: true,
                },
            });
        }

        x += display.bounds.width;
        return new BrowserWindow({
            width: 1200,
            height: 800,
            x: display.bounds.x - x,
            y: display.bounds.y,
            fullscreen: true,
            icon,
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                contextIsolation: false,
            },
        });
    });

    windows.forEach((window, index) => {
        // Maximise la fenêtre dès son ouverture
        window.maximize();

        window.loadFile(
            index === 0
                ? "src/html/mainWindow/index.html"
                : "src/html/secondWindow.html"
        );
        window.webContents.openDevTools();
    });

    return windows;
}

function createWindowsIf1Screen() {
    const mainScreen = screen.getPrimaryDisplay();

    const window1 = new BrowserWindow({
        width: mainScreen.workAreaSize.width,
        height: mainScreen.workAreaSize.height,
        x: mainScreen.bounds.x,
        y: mainScreen.bounds.y,
        center: true,
        icon,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });

    const window2 = new BrowserWindow({
        width: 1200,
        height: 800,
        x: mainScreen.bounds.x,
        y: mainScreen.bounds.y,
        fullscreen: true,
        icon,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    window2.loadFile("src/html/secondWindow.html");
    window1.loadFile("src/html/mainWindow/index.html");

    window2.webContents.openDevTools();
    window1.webContents.openDevTools();

    return [window1, window2];
}

module.exports = {
    createWindows,
    createWindowsIf1Screen,
};
