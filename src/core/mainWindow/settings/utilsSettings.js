import { dataloaded, writeFile } from "../../utils.js";

const inputColor = document.querySelector("#update-color");
const buttons = document.querySelectorAll("button");
const containerTimer = document.querySelector(".container-room__timer");
const inputsRadio = document.getElementsByName("preference-timer");
const logo = document.querySelector(".header__logo img");

const utilsSettingsObj = {
    isPreferenceTimer: null,

    init() {
        this.isPreferenceTimer = dataloaded[0]?.isPreferenceTimer;

        if (this.isPreferenceTimer) inputsRadio[0].checked = true;
        else inputsRadio[1].checked = true;

        inputColor.value = "#e4c600";
        inputColor.addEventListener("input", this.updateColor.bind(this));

        inputsRadio.forEach((input) => {
            input.addEventListener("click", () =>
                this.updatePreferenceTimer(input)
            );
        });

        logo.addEventListener("dragstart", (e) => e.preventDefault());
    },

    updateColor() {
        buttons.forEach((btn) => {
            btn.style.background = inputColor.value;
        });

        containerTimer.style.borderColor = inputColor.value;
        containerTimer.style.color = inputColor.value;
    },

    updatePreferenceTimer(input) {
        let value;
        if (input.value === "true") value = true;
        if (input.value === "false") value = false;

        if (dataloaded[0].isPreferenceTimer === value) return;

        this.isPreferenceTimer = value;
        dataloaded.forEach((obj) => {
            obj.isPreferenceTimer = value;
        });

        writeFile(dataloaded);
    },
};

export default utilsSettingsObj;
