import timerObj from "../timer/timer.js";
import roomsObj from "../rooms/rooms.js";
import { closeModal } from "../../utils.js";

const tabs = document.querySelectorAll(".tabs");
const content = document.querySelectorAll(".content");
const btnTimerSelected = document.querySelector("#btn-timer_selected");
const containerRoom = document.querySelector("#container-room");
const navbarTimer = document.querySelector("#navbar-timer");
const modal = document.querySelector("#modal-check_exit_timer");
const modalContent = document.querySelector("#modal-check_exit_timer__content");
const exitModalTimer = document.querySelector("#exit-modal_timer");
const cancelCheckExitTimer = document.querySelector("#cancel-check_exit_timer");
const closeCheckExitTimer = document.querySelector("#close-check_exit_timer");
const modals = document.querySelectorAll(".modal");
const openParamsSound = document.querySelector("#params-sound");
const btnAddPhrases = document.querySelector("#btn-add_phrases");

const manageTabsObj = {
    index: 0,

    init() {
        tabs.forEach((tab) => {
            tab.addEventListener("click", () => this.handleClickTab(tab));
        });

        btnTimerSelected.addEventListener(
            "click",
            this.handleClickTimerTab.bind(this)
        );
        cancelCheckExitTimer.addEventListener("click", () =>
            closeModal(modal, containerRoom)
        );
        closeCheckExitTimer.addEventListener("click", () =>
            closeModal(modal, containerRoom)
        );
        modal.addEventListener("click", () => closeModal(modal, containerRoom));
    },

    handleClickTab(tab) {
        if (timerObj.isActive) return this.openModalExitTimer(tab);
        this.manageTab(tab);
    },

    handleClickTimerTab() {
        if (btnTimerSelected.classList.contains("active")) return;

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }

        for (let j = 0; j < content.length; j++) {
            content[j].classList.remove("activeContent");
        }

        btnTimerSelected.classList.add("active");
        containerRoom.classList.add("activeContent");
    },

    manageTab(tab) {
        if (Number(tab.dataset.onglet) < 4) {
            navbarTimer.classList.add("hidden");

            if (openParamsSound.classList.contains("active")) {
                openParamsSound.classList.remove("active");
            }

            if (btnAddPhrases.classList.contains("active")) {
                btnAddPhrases.classList.remove("active");
            }
        }

        if (tab.classList.contains("active")) return;
        else tab.classList.add("active");

        this.index = tab.getAttribute("data-onglet");

        if (btnTimerSelected.classList.contains("active")) {
            btnTimerSelected.classList.remove("active");
        }

        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].getAttribute("data-onglet") !== this.index) {
                tabs[i].classList.remove("active");
            }
        }

        for (let j = 0; j < content.length; j++) {
            if (content[j].getAttribute("data-onglet") === this.index) {
                if (content[j].getAttribute("data-onglet") === "1")
                    roomsObj.loadRooms();

                content[j].classList.add("activeContent");
            } else {
                content[j].classList.remove("activeContent");
            }
        }

        modals.forEach((modal) => {
            if (!modal.classList.contains("hidden")) {
                modal.classList.add("hidden");
            }
        });

        timerObj.setupHomeButton();
    },

    openModalExitTimer(tab) {
        modal.classList.remove("hidden");

        modalContent.addEventListener("click", (e) => e.stopPropagation());
        exitModalTimer.addEventListener("click", () => {
            this.manageTab(tab);
            modal.classList.add("hidden");
            timerObj.isActive = false;
        });
    },

    closeModal() {
        modal.classList.add("hidden");
    },
};

export default manageTabsObj;
