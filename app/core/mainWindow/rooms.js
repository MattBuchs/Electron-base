const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
import utils from "../utils.js";

const containerHome = document.querySelector(".container-home");
const container = document.querySelector(".container");
const timer = document.querySelector(".container p");
const endTimerSound = document.querySelector("#end-timer_sound");
const notificationSound = document.querySelector("#notification_sound");
const ambientSound = document.querySelector("#ambient_sound");

const roomsObj = {
    minutes: null,
    resetMinutes: null,

    init() {
        this.loadRooms();
    },

    loadRooms() {
        const dataFolderPath = path.join(__dirname, "../../data");
        const filePath = path.join(dataFolderPath, "rooms.json");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            if (data.length > 1) {
                const rooms = JSON.parse(data);

                rooms.forEach((el) => {
                    const btn = document.createElement("button");
                    btn.textContent = el.name;
                    btn.id = el.id;
                    btn.classList.add("btn-room");

                    btn.addEventListener("click", () => {
                        this.startRoom(el);
                    });

                    containerHome.appendChild(btn);
                });
            }
        });
    },

    startRoom(room) {
        this.minutes = room.minutes;
        this.resetMinutes = room.minutes;
        endTimerSound.src = `../sounds/end_timer/${room.end_timer_sound}`;
        notificationSound.src = `../sounds/notification/${room.notification_sound}`;
        ambientSound.src = `../sounds/ambient/${room.ambient_sound}`;

        utils.displayTimer(timer, this.minutes);

        container.style.display = "flex";
        containerHome.style.display = "none";

        ipcRenderer.send("minutes", this.resetMinutes);
    },
};

export default roomsObj;
