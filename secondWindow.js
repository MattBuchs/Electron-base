const { ipcRenderer } = require("electron");

ipcRenderer.on("button-clicked", (event, message) => {
    document.getElementById(
        "messageFromMainWindow"
    ).textContent = `Message reçu : ${message}`;
});

ipcRenderer.on("play-timer", (event, message) => {
    document.querySelector(".container p").textContent = message;
});
