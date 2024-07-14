const { ipcRenderer } = require("electron");

const messageReceived = document.querySelector("#message-received");

ipcRenderer.on("send-message", (_, message) => {
    messageReceived.textContent = message;
});

ipcRenderer.on("clear-message", () => {
    messageReceived.textContent = "";
});
