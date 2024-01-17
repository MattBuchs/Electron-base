const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");
import utils from "../../utils.js";
import addPhrasesObj from "../phrases/addPhrases.js";

const containerRoom = document.querySelector("#container-room");
const containerBtnRooms = document.querySelector("#container-btn_rooms");
const timer = document.querySelector("#timer-room");
const endTimerSound = document.querySelector("#end-timer_sound");
const notificationSound = document.querySelector("#notification_sound");
const ambientSound = document.querySelector("#ambient_sound");
const endTimerRange = document.querySelector("#volume-end_timer");
const notificationRange = document.querySelector("#volume-notification");
const amibentRange = document.querySelector("#volume-amibent");
const pourcentageVolume = document.querySelectorAll(".volume p");
const btnHome = document.querySelector("#btn-home");
const btnTimerSelected = document.querySelector("#btn-timer_selected");
const content = document.querySelectorAll(".content");
const navbarTimer = document.querySelector("#navbar-timer");
const btnNotification = document.querySelector("#btn-notification_sound");
const btnAmbient = document.querySelector("#btn-ambient_sound");

const dataFolderPath = path.join(__dirname, "../data");
const filePath = path.join(dataFolderPath, "rooms.json");

const roomsObj = {
    hours: null,
    minutes: null,
    resetHours: null,
    resetMinutes: null,
    roomId: null,
    rangeValue: [],

    init() {
        this.loadRooms();
    },

    loadRooms() {
        if (containerBtnRooms.children.length > 0) {
            const buttons = containerBtnRooms.querySelectorAll("button");
            buttons.forEach((room) => {
                containerBtnRooms.removeChild(room);
            });
        }

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            if (data.length > 2) {
                const rooms = JSON.parse(data);
                this.rangeValue = rooms;

                rooms.forEach((el) => {
                    const btn = document.createElement("button");
                    btn.classList.add("room-btn");

                    const h2 = document.createElement("h2");
                    h2.textContent = el.name;
                    btn.appendChild(h2);

                    const pTimer = this.createParagraphWithSpan(
                        `${el.hours > 0 ? el.hours + "h : " : ""}${
                            el.minutes
                        }mn : 0s`,
                        "Timer : "
                    );
                    const pNotification = this.createParagraphWithSpan(
                        el.notification_sound,
                        "Son notification : "
                    );
                    const pAmbient = this.createParagraphWithSpan(
                        el.ambient_sound,
                        "Son ambiant : "
                    );
                    const pAlarm = this.createParagraphWithSpan(
                        el.end_timer_sound,
                        "Son timer : "
                    );

                    btn.appendChild(pTimer);
                    btn.appendChild(pNotification);
                    btn.appendChild(pAmbient);
                    btn.appendChild(pAlarm);

                    containerBtnRooms.appendChild(btn);

                    const idOfRoom = el.id;

                    btn.addEventListener("click", () => {
                        this.startRoom(el, idOfRoom);
                    });
                });
            } else {
                const text = document.createElement("p");
                text.textContent = "Pas de timer...";
                text.classList.add("txt-no_toom");

                containerBtnRooms.appendChild(text);
            }
        });
    },

    startRoom(room, idOfRoom) {
        this.roomId = idOfRoom;
        this.hours = room.hours;
        this.minutes = room.minutes;
        this.resetHours = room.hours;
        this.resetMinutes = room.minutes;

        if (room.end_timer_sound)
            endTimerSound.src = `../../public/sounds/end_timer/${room.end_timer_sound}`;
        if (room.notification_sound) {
            notificationSound.src = `../../public/sounds/notification/${room.notification_sound}`;

            if (btnNotification.classList.contains("hidden"))
                btnNotification.classList.remove("hidden");
        } else btnNotification.classList.add("hidden");
        if (room.ambient_sound) {
            ambientSound.src = `../../public/sounds/ambient/${room.ambient_sound}`;

            if (btnAmbient.classList.contains("hidden"))
                btnAmbient.classList.remove("hidden");
        } else btnAmbient.classList.add("hidden");

        utils.displayTimer(timer, this.hours, this.minutes);
        this.updateRangeAndSound(idOfRoom);

        navbarTimer.classList.remove("hidden");
        btnHome.classList.remove("active");
        btnTimerSelected.classList.add("active");

        for (let i = 0; i < content.length; i++) {
            content[i].classList.remove("activeContent");
        }

        containerRoom.classList.add("activeContent");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const dataObj = JSON.parse(data);
            const index = dataObj.findIndex((obj) => obj.id === this.roomId);

            addPhrasesObj.loadOption(dataObj[index]);
        });

        ipcRenderer.send("times", this.resetHours, this.resetMinutes);
    },

    updateRangeAndSound(idOfRoom) {
        const findRoom = this.rangeValue.find((el) => el.id === idOfRoom);

        endTimerRange.value = findRoom.end_timer_volume * 100;
        notificationRange.value = findRoom.notification_volume * 100;
        amibentRange.value = findRoom.ambient_volume * 100;

        pourcentageVolume[0].textContent = endTimerRange.value + "%";
        pourcentageVolume[1].textContent = notificationRange.value + "%";
        pourcentageVolume[2].textContent = amibentRange.value + "%";

        endTimerSound.volume = Number(endTimerRange.value) / 100;
        notificationSound.volume = Number(notificationRange.value) / 100;
        ambientSound.volume = Number(amibentRange.value) / 100;
    },

    createParagraphWithSpan(text, spanText) {
        const p = document.createElement("p");
        const span = document.createElement("span");
        span.classList.add("strong");
        span.textContent = spanText + " ";
        p.appendChild(span);
        p.appendChild(document.createTextNode(text ? text : " - "));
        return p;
    },
};

export default roomsObj;
