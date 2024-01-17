const path = require("path");

const header = document.querySelector(".header");
const main = document.querySelector(".main");
const btnExpandNavbar = document.querySelector("#expand-navbar");
const imgExpandNavbar = document.querySelector("#expand-navbar img");
const h1 = document.querySelector(".header__logo h1");
const paragraphs = document.querySelectorAll(".header__nav p");

const manageNavbarObj = {
    navbarExpanded: false,

    init() {
        btnExpandNavbar.addEventListener("click", this.expandNavbar.bind(this));
    },

    expandNavbar() {
        if (this.navbarExpanded) {
            header.style.width = "";
            header.style.alignItems = "";
            main.style.width = "";
            h1.style.display = "";
            imgExpandNavbar.src = path.join(
                __dirname,
                "../../public/img/chevron-right.svg"
            );

            paragraphs.forEach((paragraph) => {
                paragraph.style.display = "";
            });

            this.navbarExpanded = false;
        } else {
            header.style.width = "30%";
            header.style.alignItems = "normal";
            main.style.width = "70%";
            h1.style.display = "initial";
            imgExpandNavbar.src = path.join(
                __dirname,
                "../../public/img/chevron-left.svg"
            );

            paragraphs.forEach((paragraph) => {
                paragraph.style.display = "initial";
            });

            this.navbarExpanded = true;
        }
    },
};

export default manageNavbarObj;
