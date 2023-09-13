const utils = {
    displayTimer(timer, minutes) {
        if (minutes === 59) {
            timer.textContent = `1h : 0mn : 0s`;
        } else {
            timer.textContent = `${minutes + 1}mn : 0s`;
        }
    },
};

export default utils;
