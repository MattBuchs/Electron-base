const fs = require("fs");
const path = require("path");

const inputColor = document.querySelector("#update-color");
const buttons = document.querySelectorAll("button");
const containerTimer = document.querySelector(".container-room__timer");
const inputsRadio = document.getElementsByName("preference-timer");

const dataFolderPath = path.join(__dirname, "../../data");
const filePath = path.join(dataFolderPath, "rooms.json");

const utilsSettingsObj = {
    existingData: null,
    isPreferenceTimer: null,

    init() {
        this.existingData = this.loadData();
        this.isPreferenceTimer = this.existingData[0].isPreferenceTimer;

        if (this.isPreferenceTimer) inputsRadio[0].checked = true;
        else inputsRadio[1].checked = true;

        inputColor.value = "#e4c600";
        inputColor.addEventListener("input", this.updateColor.bind(this));

        inputsRadio.forEach((input) => {
            input.addEventListener("click", () =>
                this.updatePreferenceTimer(input)
            );
        });
    },

    updateColor() {
        buttons.forEach((btn) => {
            btn.style.background = inputColor.value;
        });

        containerTimer.style.borderColor = inputColor.value;
        containerTimer.style.color = inputColor.value;
    },

    updatePreferenceTimer(input) {
        const existingData = this.loadData();

        let value;
        if (input.value === "true") value = true;
        if (input.value === "false") value = false;

        if (existingData[0].isPreferenceTimer === value) return;

        this.isPreferenceTimer = value;
        existingData.forEach((obj) => {
            obj.isPreferenceTimer = value;
        });

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    },

    loadData() {
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            try {
                if (fileContent.length > 1) {
                    return JSON.parse(fileContent);
                }
            } catch (err) {
                console.error(
                    "Erreur lors de la lecture des données JSON existantes :",
                    err
                );
                return null;
            }
        }

        return null;
    },
};

export default utilsSettingsObj;
