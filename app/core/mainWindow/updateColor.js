const inputColor = document.querySelector("#update-color");
const buttons = document.querySelectorAll("button");
const btnHome = document.querySelectorAll("#container-btn_rooms button");
const containerTimer = document.querySelector(".container-room__timer");

const updateColorObj = {
    init() {
        inputColor.value = "#e4c600";
        inputColor.addEventListener("input", this.updateColor.bind(this));
    },

    updateColor() {
        buttons.forEach((btn) => {
            btn.style.background = inputColor.value;
        });

        containerTimer.style.borderColor = inputColor.value;
        containerTimer.style.color = inputColor.value;
    },
};

export default updateColorObj;
