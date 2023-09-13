const { ipcRenderer } = require("electron");

const formMessage = document.querySelector("#form-message");
const message = document.querySelector("#message");

const messagesObj = {
    init() {
        formMessage.addEventListener("submit", this.sendMessage.bind(this));
    },

    sendMessage(e) {
        e.preventDefault();

        if (message.value !== "") {
            const messageWrited = message.value;
            message.value = "";

            ipcRenderer.send("send-message", messageWrited);
        }
    },
};

export default messagesObj;
