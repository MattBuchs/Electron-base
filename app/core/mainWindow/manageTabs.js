import timerObj from "./timer.js";

const tabs = document.querySelectorAll(".tabs");
const content = document.querySelectorAll(".content");
const btnTimerSelected = document.querySelector("#btn-timer_selected");
const containerRoom = document.querySelector("#container-room");
const navbarTimer = document.querySelector("#navbar-timer");
const modal = document.querySelector("#modal-check_exit_timer");
const exitModalTimer = document.querySelector("#exit-modal_timer");
const cancelCheckExitTimer = document.querySelector("#cancel-check_exit_timer");
const closeCheckExitTimer = document.querySelector("#close-check_exit_timer");

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
        cancelCheckExitTimer.addEventListener(
            "click",
            this.closeModal.bind(this)
        );
        closeCheckExitTimer.addEventListener(
            "click",
            this.closeModal.bind(this)
        );
    },

    handleClickTab(tab) {
        if (timerObj.isActive) return this.openModal(tab);
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
        navbarTimer.classList.add("hidden");

        if (tab.classList.contains("active")) {
            return;
        } else {
            tab.classList.add("active");
        }

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
                content[j].classList.add("activeContent");
            } else {
                content[j].classList.remove("activeContent");
            }
        }

        timerObj.setupHomeButton();
    },

    openModal(tab) {
        modal.classList.remove("hidden");

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
