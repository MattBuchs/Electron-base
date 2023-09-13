const { ipcRenderer } = require("electron");

const messageReceived = document.querySelector("#message-received");

ipcRenderer.on("send-message", (_, message) => {
    messageReceived.textContent = message;
    messageReceived.classList.remove("not-indice");
});

ipcRenderer.on("clear-message", () => {
    messageReceived.textContent = "indice à venir...";
    messageReceived.classList.add("not-indice");
});
