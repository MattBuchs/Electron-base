const { BrowserWindow, screen } = require("electron");

function createWindows() {
    const displays = screen.getAllDisplays();
    console.log(displays);
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
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    enableRemoteModule: true,
                },
            });
        }

        x += display.bounds.x;
        return new BrowserWindow({
            width: 1200,
            height: 800,
            x: display.bounds.x - x,
            y: display.bounds.y,
            fullscreen: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            },
        });
    });

    windows.forEach((window, index) => {
        window.loadFile(
            index === 0
                ? "src/html/mainWindow/index.html"
                : "src/html/secondWindow.html"
        );
        window.webContents.openDevTools();
    });

    return windows;
}

module.exports = createWindows;
