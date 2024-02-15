import roomsObj from "../rooms/rooms.js";
import { openModal, closeModal, dataloaded, writeFile } from "../../utils.js";
import { notification } from "../UI/notification.js";

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
            closeModal(modalAddPhrases, btnAddPhrases)
        );
        modalAddPhrases.addEventListener("click", () =>
            closeModal(modalAddPhrases, btnAddPhrases)
        );
        btnValidate.addEventListener("click", this.addPhrases.bind(this));
    },

    addPhrases() {
        const value = phrases.value;
        const option = document.createElement("option");
        const content = document.createTextNode(value);

        option.appendChild(content);
        phrasesSelect.appendChild(option);

        // Trouve l'index de l'objet avec l'ID donné dans le tableau
        const index = dataloaded.findIndex((obj) => obj.id === roomsObj.roomId);

        dataloaded[index].phrases.push(value);

        writeFile(dataloaded);

        phrases.value = "";

        closeModal(modalAddPhrases, btnAddPhrases);
        notification("La phrase à été ajouté au timer.", "success");
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
