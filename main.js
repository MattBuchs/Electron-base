const { app, BrowserWindow } = require("electron");
require("electron-reload")(__dirname, { ignored: [/\.json$/] });

const createWindows = require("./app/services/createWindows");
const setupIPCFunctions = require("./app/services/ipcFunctions");

let windows = {
    mainWindow: null,
    secondWindow: null,
    thirdWindow: null,
};

const createWindow = () => {
    createWindows(windows);
    setupIPCFunctions(windows);

    windows.mainWindow.on("closed", () => {
        console.log(windows.secondWindow);
        if (windows.secondWindow) windows.secondWindow.close();
        if (windows.thirdWindow) windows.thirdWindow.close();
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
