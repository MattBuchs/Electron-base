const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let secondWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadFile('mainWindow.html');

  secondWindow = new BrowserWindow({ width: 800, height: 600 });
  secondWindow.loadFile('secondWindow.html');

  // Code pour la communication IPC
  ipcMain.on('button-clicked', (event, message) => {
    // Émettre l'événement vers la deuxième fenêtre
    secondWindow.webContents.send('button-clicked', message);
  });
});