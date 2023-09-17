const utils = {
    displayTimer(timer, hours, minutes) {
        timer.textContent = `${hours ? hours + "h : " : ""}${minutes}mn : 0s`;
    },
};

export default utils;
