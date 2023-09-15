const { ipcRenderer } = require("electron");

const formMessage = document.querySelector("#form-message");
const message = document.querySelector("#message");
const btnClear = document.querySelector("#btn-clear");

const messagesObj = {
    init() {
        formMessage.addEventListener("submit", this.sendMessage.bind(this));
        btnClear.addEventListener("submit", this.clearMessage.bind(this));
    },

    sendMessage(e) {
        e.preventDefault();

        if (message.value !== "") {
            const messageWrited = message.value;
            message.value = "";

            ipcRenderer.send("send-message", messageWrited);
        }
    },

    clearMessage() {
        ipcRenderer.send("clear-message");
    },
};

export default messagesObj;
