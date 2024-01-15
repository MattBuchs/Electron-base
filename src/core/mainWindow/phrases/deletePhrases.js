import roomsObj from "../rooms/rooms.js";
const fs = require("fs");
const path = require("path");

const selectDeletePhrase = document.querySelector("#select-delete_phrase");
const deletePhraseForm = document.querySelector("#delete-phrase");

const dataFolderPath = path.join(__dirname, "../data");
const filePath = path.join(dataFolderPath, "rooms.json");

const deletePhrasesObj = {
    init() {
        deletePhraseForm.addEventListener(
            "submit",
            this.deletePhrase.bind(this)
        );
    },

    loadPhrases() {
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            try {
                if (fileContent.length > 1) {
                    existingData = JSON.parse(fileContent);
                }
            } catch (err) {
                console.error(
                    "Erreur lors de la lecture des données JSON existantes :",
                    err
                );
                return;
            }
        }

        const indexRoom = existingData.findIndex(
            (el) => el.id === roomsObj.roomId
        );
        const phrases = existingData[indexRoom].phrases;

        selectDeletePhrase.options.length = 1;
        phrases.forEach((el) => {
            const option = document.createElement("option");
            const content = document.createTextNode(el);

            option.appendChild(content);
            selectDeletePhrase.appendChild(option);
        });
    },

    deletePhrase(e) {
        e.preventDefault();

        if (selectDeletePhrase.selectedIndex === 0) return;

        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            try {
                if (fileContent.length > 1) {
                    existingData = JSON.parse(fileContent);
                }
            } catch (err) {
                console.error(
                    "Erreur lors de la lecture des données JSON existantes :",
                    err
                );
                return;
            }
        }

        const indexRoom = existingData.findIndex(
            (el) => el.id === roomsObj.roomId
        );
        const phrases = existingData[indexRoom].phrases;
        const optionSelected =
            selectDeletePhrase.options[selectDeletePhrase.selectedIndex];

        const findIndex = phrases.indexOf(optionSelected.textContent);
        existingData[indexRoom].phrases.splice(findIndex, 1);

        fs.writeFile(
            filePath,
            JSON.stringify(existingData, null, 2),
            "utf8",
            (err) => {
                if (err) {
                    console.error(
                        "Erreur lors de l'écriture des données dans le fichier :",
                        err
                    );
                } else {
                    window.location.reload();
                }
            }
        );
    },
};

export const { loadPhrases } = deletePhrasesObj;
export default deletePhrasesObj;
