const { ipcRenderer } = require("electron");

const formMessage = document.querySelector("#form-message");
const message = document.querySelector("#message");
const phrasesSelected = document.querySelector("#phrases-select");
const btnClear = document.querySelector("#btn-clear");

const messagesObj = {
    init() {
        formMessage.addEventListener("submit", this.sendMessage.bind(this));
        btnClear.addEventListener("click", this.clearMessage.bind(this));
        phrasesSelected.addEventListener("change", this.changeValue.bind(this));
        message.addEventListener("input", this.updateSelect.bind(this));
    },

    sendMessage(e) {
        e.preventDefault();

        if (message.value !== "") {
            phrasesSelected.selectedIndex = 0;
            const messageWrited = message.value;
            message.value = "";

            ipcRenderer.send("send-message", messageWrited);
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

    clearMessage() {
        ipcRenderer.send("clear-message");
    },
};

export default messagesObj;
