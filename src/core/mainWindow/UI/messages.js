const { ipcRenderer } = require("electron");

const formMessage = document.querySelector("#form-message");
const message = document.querySelector("#message");
const phrasesSelected = document.querySelector("#phrases-select");
const btnClear = document.querySelector("#btn-clear");
const supprMessage = document.querySelector("#img-delete");
const getMessage = document.querySelector("#img-back");
const counterMessage = document.querySelector("#counter-message");

const messagesObj = {
    message: null,

    init() {
        formMessage.addEventListener("submit", this.sendMessage.bind(this));
        btnClear.addEventListener("click", this.clearMessage.bind(this));
        phrasesSelected.addEventListener("change", this.changeValue.bind(this));
        message.addEventListener("input", this.updateSelect.bind(this));
        supprMessage.addEventListener("click", this.deleteMessage.bind(this));
        getMessage.addEventListener("click", this.getMessage.bind(this));
        message.addEventListener("keydown", this.handleKeyDown.bind(this));
    },

    sendMessage(e) {
        e.preventDefault();

        const messageWrited = message.value;

        if (messageWrited !== "" || messageWrited.length > 230) {
            phrasesSelected.selectedIndex = 0;

            ipcRenderer.send("send-message", messageWrited);
            this.message = messageWrited;
        }
    },

    changeValue() {
        const index = phrasesSelected.selectedIndex;

        if (phrasesSelected.options[index].value === "") {
            message.value = "";
            counterMessage.textContent = message.value.length;

            return;
        }

        const value = phrasesSelected.options[index].textContent;
        message.value = value;
        counterMessage.textContent = message.value.length;
    },

    updateSelect() {
        phrasesSelected.selectedIndex = 0;
        counterMessage.textContent = message.value.length;
    },

    getMessage() {
        message.value = this.message;
    },

    clearMessage() {
        ipcRenderer.send("clear-message");
    },

    deleteMessage() {
        message.value = "";
        counterMessage.textContent = "0";
    },

    handleKeyDown(e) {
        if (e.shiftKey && e.key === "Enter") this.sendMessage(e);
        if (!e.shiftKey && e.key === "Delete") this.deleteMessage();
        if (e.shiftKey && e.key === "Delete") this.clearMessage();
    },
};

export default messagesObj;
