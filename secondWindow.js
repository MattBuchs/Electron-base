const { ipcRenderer } = require('electron');

ipcRenderer.on('button-clicked', (event, message) => {
  document.getElementById('messageFromMainWindow').textContent = `Message reçu : ${message}`;
});