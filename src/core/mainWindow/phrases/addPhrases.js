const fs = require("fs");
const path = require("path");
import roomsObj from "../rooms/rooms.js";
import { openModal, closeModal } from "../../utils.js";

const containerRoom = document.querySelector("#container-room");
const btnAddPhrases = document.querySelector("#btn-add_phrases");
const modalAddPhrases = document.querySelector("#modal-add_phrases");
const modalContent = document.querySelector("#modal-add_phrases__content");
const btnCloseModal = document.querySelector("#close-modal_addphrases");
const btnValidate = document.querySelector("#btn-validate_addphrases");
const phrases = document.querySelector("#add-phrases");
const phrasesSelect = document.querySelector("#phrases-select");
const modalParamsSound = document.querySelector("#modal-params_sound");
const openParamsSound = document.querySelector("#params-sound");

const addPhrasesObj = {
    init() {
        btnAddPhrases.addEventListener("click", () => {
            openModal(
                containerRoom,
                modalAddPhrases,
                modalContent,
                modalParamsSound,
                btnAddPhrases,
                openParamsSound
            );
        });
        btnCloseModal.addEventListener("click", () =>
            closeModal(modalAddPhrases, containerRoom, btnAddPhrases)
        );
        modalAddPhrases.addEventListener("click", () =>
            closeModal(modalAddPhrases, containerRoom, btnAddPhrases)
        );
        btnValidate.addEventListener("click", this.addPhrases.bind(this));
    },

    addPhrases() {
        const value = phrases.value;
        const option = document.createElement("option");
        const content = document.createTextNode(value);

        option.appendChild(content);
        phrasesSelect.appendChild(option);

        const dataFolderPath = path.join(__dirname, "../data");
        const filePath = path.join(dataFolderPath, "rooms.json");

        // Charger les données JSON existantes
        const jsonData = require(filePath);
        // Trouver l'index de l'objet avec l'ID donné dans le tableau
        const index = jsonData.findIndex((obj) => obj.id === roomsObj.roomId);

        jsonData[index].phrases.push(value);

        // Convertir les données en JSON
        const jsonString = JSON.stringify(jsonData);

        // Enregistrer le fichier JSON
        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });

        phrases.value = "";
        closeModal(modalAddPhrases, containerRoom, btnAddPhrases);
    },

    loadOption(data) {
        phrasesSelect.options.length = 1;

        data.phrases.forEach((el) => {
            const option = document.createElement("option");
            const content = document.createTextNode(el);

            option.appendChild(content);
            phrasesSelect.appendChild(option);
        });
    },
};

export default addPhrasesObj;
