import { addEvent } from "./common.js";
import { initialiseCountdown } from "./countdown.js";
import { authState } from "./firebaseAuth.js";

const initialiseHomePage = () => {
    initialiseCountdown();
}

initialiseHomePage();