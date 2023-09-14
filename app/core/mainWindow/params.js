const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

const btnParams = document.querySelector("#btn-params");
const btnClose = document.querySelector("#close_params");
const modal = document.querySelector(".modal-params");
const btnAddFile = document.querySelector("#btn-add_file");

const paramsObj = {
    init() {
        btnParams.addEventListener("click", this.openModal.bind(this));
        btnClose.addEventListener("click", this.closeModal.bind(this));
        btnAddFile.addEventListener("click", this.uploadFile.bind(this));
    },

    openModal() {
        modal.classList.add("open");
    },

    closeModal() {
        modal.classList.remove("open");
    },

    async uploadFile() {
        try {
            const fileContent = await ipcRenderer.invoke("open-file-dialog");

            if (fileContent) {
                const { file, fileName } = fileContent;
                // Créez le chemin du fichier destination dans le dossier "song"
                const destinationPath = path.join(
                    __dirname,
                    "../song",
                    fileName
                );
                console.log(destinationPath);

                // Écrie le contenu du fichier dans le fichier destination
                fs.writeFileSync(destinationPath, file, "binary");

                console.log(
                    'Fichier copié avec succès dans le dossier "song".'
                );
            }
        } catch (error) {
            console.error("Erreur lors de la sélection du fichier :", error);
        }
    },
};

export default paramsObj;
