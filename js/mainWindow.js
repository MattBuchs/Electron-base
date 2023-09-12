const { ipcRenderer } = require("electron");
import utils from "./utils.js";
const fs = require("fs");
const path = require("path");

const dataFolderPath = path.join(__dirname, "../data"); // Chemin du dossier de données
const filePath = path.join(dataFolderPath, "rooms.json"); // Chemin du fichier de données

const timer = document.querySelector(".container p");
const playTimer = document.querySelector("#play");
const stopTimer = document.querySelector("#stop");
const btnResetTimer = document.querySelector("#reset");
const stopAlert = document.querySelector("#stop-alert");
const song = document.querySelector(".song");

let minutes = 59;
let seconds = 60;
let loop = null;
let resetMinutes;

function resetimer() {
    playTimer.textContent = "Commencer";
    playTimer.style.display = "initial";
    stopTimer.style.display = "none";

    clearInterval(loop);

    minutes = resetMinutes;
    seconds = 60;

    utils.displayTimer(timer, minutes);

    song.pause();
    song.currentTime = 0;
}

playTimer.addEventListener("click", () => {
    stopTimer.style.display = "initial";
    playTimer.style.display = "none";

    loop = setInterval(() => {
        seconds--;

        if (minutes === 0 && seconds === 0) {
            clearInterval(loop);
            stopTimer.style.display = "none";
            playTimer.style.display = "none";
            stopAlert.style.display = "initial";

            song.play();
        } else {
            if (seconds === -1) {
                minutes--;
                seconds = 59;
            }
        }

        timer.textContent = `${minutes < 10 ? "0" : ""}${minutes}mn : ${
            seconds < 10 ? "0" : ""
        }${seconds}s`;
    }, 1000);

    ipcRenderer.send("play-timer");
});

stopTimer.addEventListener("click", () => {
    playTimer.textContent = "Reprendre";
    playTimer.style.display = "initial";
    stopTimer.style.display = "none";

    clearInterval(loop);

    ipcRenderer.send("stop-timer");
});

btnResetTimer.addEventListener("click", () => {
    const confirmReset = confirm("Êtes-vous sur de vouloir rénitialiser ?");

    if (confirmReset) {
        resetimer();
        ipcRenderer.send("reset-timer", resetMinutes);
    }
});

stopAlert.addEventListener("click", () => {
    song.pause();
    song.currentTime = 0;

    stopAlert.style.display = "none";
});

const formMessage = document.querySelector("#form-message");
const message = document.querySelector("#message");

formMessage.addEventListener("submit", (e) => {
    e.preventDefault();

    if (message.value !== "") {
        const messageWrited = message.value;
        message.value = "";

        ipcRenderer.send("send-message", messageWrited);
    }
});

const btnSong = document.querySelector("#btn-song");
btnSong.addEventListener("click", () => {
    song.play();
});

const btnClear = document.querySelector("#btn-clear");
btnClear.addEventListener("click", () => {
    ipcRenderer.send("clear-message");
});

const formContainerHome = document.querySelector(".container-home form");
const containerHome = document.querySelector(".container-home");
const container = document.querySelector(".container");

formContainerHome.addEventListener("submit", (e) => {
    e.preventDefault();
});

fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const rooms = JSON.parse(data);

    rooms.forEach((el) => {
        const btn = document.createElement("button");
        btn.textContent = el.name;
        btn.id = el.id;
        btn.classList.add("btn-room");

        btn.addEventListener("click", () => {
            minutes = el.minutes;
            resetMinutes = el.minutes;
            seconds = 60;

            utils.displayTimer(timer, minutes);

            container.style.display = "flex";
            containerHome.style.display = "none";

            ipcRenderer.send("minutes", resetMinutes);
        });

        containerHome.appendChild(btn);
    });
});

const home = document.querySelector("#btn-home");

home.addEventListener("click", () => {
    container.style.display = "none";
    containerHome.style.display = "flex";

    resetimer();
});

const btnAddRoom = document.querySelector("#btn-add_room");
const modalAddRoom = document.querySelector(".modal-add_room");

btnAddRoom.addEventListener("click", () => {
    modalAddRoom.style.display = "flex";
    containerHome.style.display = "none";

    listSongs();
});

function listSongs() {
    const songFolder = path.join(__dirname, "../src/song");
    const songList = document.querySelector("#room_song");

    fs.readdir(songFolder, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        files.forEach((el, i) => {
            const option = document.createElement("option");
            option.textContent = el;
            option.value = el;

            songList.appendChild(option);
        });
    });
}

const formAddRoom = document.querySelector("#form-add_room");

formAddRoom.addEventListener("submit", (e) => {
    e.preventDefault();

    // Charger les données JSON existantes (si le fichier existe)
    let existingData;
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        try {
            existingData = JSON.parse(fileContent);
        } catch (err) {
            console.error(
                "Erreur lors de la lecture des données JSON existantes :",
                err
            );
        }
    }

    const name = document.querySelector("#room_name").value;
    const minutes = document.querySelector("#room_minutes").value;
    const song = document.querySelector("#room_song").value;

    const newData = {
        id: `btn-room_${existingData.length + 1}`,
        name,
        song,
        minutes: Number(minutes - 1),
    };

    const updatedData = [...existingData, newData];

    // Écrire dans le fichier JSON
    fs.writeFile(filePath, JSON.stringify(updatedData), "utf8", (err) => {
        if (err) {
            console.error(err);
        }
    });
});
