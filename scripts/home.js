import { addEvent } from "./common.js";
import { initialiseCountdown } from "./countdown.js";
import { authState } from "./firebaseAuth.js";

const initialiseHomePage = () => {
    window.addEventListener("scroll", function () {
        const body = document.body;
        if (window.scrollY > 50) {
            body.classList.add("scrolled");
        } else {
            body.classList.remove("scrolled");
        }
    });

    initialiseCountdown();
}

initialiseHomePage();