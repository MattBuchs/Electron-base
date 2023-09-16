const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

const btnParams = document.querySelector("#btn-params");
const btnClose = document.querySelector("#close_params");
const modal = document.querySelector(".modal-params");
const btnAddFileEndTimer = document.querySelector("#btn-add_file-endtimer");
const btnAddFileNotification = document.querySelector(
    "#btn-add_file-notification"
);
const btnAddFileAmbient = document.querySelector("#btn-add_file-ambient");
const notification = document.querySelector(".modal-notification");

const paramsObj = {
    init() {
        btnParams.addEventListener("click", this.openModal.bind(this));
        btnClose.addEventListener("click", this.closeModal.bind(this));
        btnAddFileEndTimer.addEventListener(
            "click",
            function () {
                this.uploadFile("end_timer");
            }.bind(this)
        );
        btnAddFileNotification.addEventListener(
            "click",
            function () {
                this.uploadFile("notification");
            }.bind(this)
        );
        btnAddFileAmbient.addEventListener(
            "click",
            function () {
                this.uploadFile("ambient");
            }.bind(this)
        );
    },

    openModal() {
        modal.classList.remove("hidden");
    },

    closeModal() {
        modal.classList.add("hidden");
    },

    async uploadFile(pathName) {
        try {
            const fileContent = await ipcRenderer.invoke("open-file-dialog");

            if (fileContent) {
                const { file, fileName } = fileContent;
                // Créez le chemin du fichier destination dans le dossier "sound"
                const destinationPath = path.join(
                    __dirname,
                    `../sounds/${pathName}`,
                    fileName
                );

                // Écrie le contenu du fichier dans le fichier destination
                fs.writeFileSync(destinationPath, file, "binary");

                // Affiche une notification
                notification.style.transform = "translateY(0)";

                setTimeout(() => {
                    notification.style.transform = "translateY(-100%)";
                }, 3000);
            }
        } catch (error) {
            console.error("Erreur lors de la sélection du fichier :", error);
        }
    },
};

export default paramsObj;
