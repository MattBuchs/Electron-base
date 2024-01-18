const path = require("path");

const header = document.querySelector(".header");
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
            h1.style.display = "";
            imgExpandNavbar.src = path.join(
                __dirname,
                "../../public/img/chevron-right.svg"
            );

            paragraphs.forEach((paragraph) => {
                paragraph.style.display = "";
            });

            header.classList.remove("navbar-anim");
            header.classList.add("navbar-anim2");

            this.navbarExpanded = false;
        } else {
            h1.style.display = "initial";
            imgExpandNavbar.src = path.join(
                __dirname,
                "../../public/img/chevron-left.svg"
            );

            paragraphs.forEach((paragraph) => {
                paragraph.style.display = "initial";
            });

            header.classList.add("navbar-anim");
            header.classList.remove("navbar-anim2");

            this.navbarExpanded = true;
        }
    },
};

export default manageNavbarObj;
