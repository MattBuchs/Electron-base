const fs = require("fs");
const path = require("path");
const notificationContainer = document.querySelector("#notification");

const utils = {
    displayTimer(timer, hours, minutes) {
        timer.textContent = `${hours ? hours + "h : " : ""}${minutes}mn : 0s`;
    },

    notification(message) {
        notificationContainer.style.backgroundColor = "#ff0000";
        notificationContainer.querySelector("p").textContent = message;

        notificationContainer.style.transform = "translateY(0)";

        setTimeout(() => {
            notificationContainer.style.transform = "translateY(-100%)";
        }, 3000);
    },

    openModal(container, modal, modalContent, otherModal) {
        modalContent.addEventListener("click", (e) => e.stopPropagation());

        modal.classList.remove("hidden");
        container.classList.add("blur");

        if (!otherModal.classList.contains("hidden")) {
            otherModal.classList.add("hidden");
        }
    },

    closeModal(modal, container) {
        modal.classList.add("hidden");
        container.classList.remove("blur");
    },

    listSounds(soundDirectories) {
        soundDirectories.forEach((directory) => {
            const soundOption = document.querySelectorAll(
                `${directory.listId} .recover-sound`
            );

            if (soundOption.length > 0) {
                soundOption.forEach((el) => {
                    el.remove();
                });
            }

            const listElement = document.querySelector(directory.listId);
            const soundFiles = fs.readdirSync(directory.path);

            soundFiles.forEach((fileName) => {
                const option = document.createElement("option");
                option.textContent = fileName;
                option.value = fileName;
                option.classList.add("recover-sound");
                listElement.appendChild(option);
            });
        });
    },
};

export const { openModal, closeModal, listSounds, notification } = utils;
export default utils;
