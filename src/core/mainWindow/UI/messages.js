const { ipcRenderer } = require("electron");

const formMessage = document.querySelector("#form-message");
const message = document.querySelector("#message");
const phrasesSelected = document.querySelector("#phrases-select");
const btnClear = document.querySelector("#btn-clear");
const supprMessage = document.querySelector("#img-delete");
const getMessage = document.querySelector("#img-back");

const messagesObj = {
    message: null,

    init() {
        formMessage.addEventListener("submit", this.sendMessage.bind(this));
        btnClear.addEventListener("click", this.clearMessage.bind(this));
        phrasesSelected.addEventListener("change", this.changeValue.bind(this));
        message.addEventListener("input", this.updateSelect.bind(this));
        supprMessage.addEventListener("click", this.deleteMessage.bind(this));
        getMessage.addEventListener("click", this.getMessage.bind(this));
    },

    sendMessage(e) {
        e.preventDefault();

        if (message.value !== "") {
            phrasesSelected.selectedIndex = 0;
            const messageWrited = message.value;

            ipcRenderer.send("send-message", messageWrited);
            this.message = messageWrited;
        }
    },

    changeValue() {
        const index = phrasesSelected.selectedIndex;

        if (phrasesSelected.options[index].value === "")
            return (message.value = "");

        const value = phrasesSelected.options[index].textContent;
        message.value = value;
    },

    updateSelect() {
        phrasesSelected.selectedIndex = 0;
    },

    getMessage() {
        console.log(message, this.message);
        message.value = this.message;
    },

    clearMessage() {
        ipcRenderer.send("clear-message");
    },

    deleteMessage() {
        message.value = "";
    },
};

export default messagesObj;
