const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
import utils from "../utils.js";

const containerHome = document.querySelector(".container-home");
const container = document.querySelector(".container");
const containerBtnRooms = document.querySelector("#container-btn_rooms");
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
                    const div = document.createElement("div");
                    const btn = document.createElement("button");
                    const btnDelete = document.createElement("button");

                    btn.classList.add("room-btn");
                    div.classList.add("container-one_btn");
                    btnDelete.classList.add("btn-delete_room");
                    btnDelete.classList.add("hidden");

                    div.id = el.id;
                    btn.textContent = el.name;
                    btnDelete.textContent = "X";

                    btn.addEventListener("click", () => {
                        this.startRoom(el);
                    });

                    containerBtnRooms.appendChild(div);
                    div.appendChild(btn);
                    div.appendChild(btnDelete);
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
