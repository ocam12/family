import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { initialiseSignInPage } from "./signIn.js";
import { switchToLoggedIn } from "./signIn.js";
import { switchToLogIn } from "./signIn.js";
import { addCheckToLockedLinks } from "./common.js";

//export the current user as an object so it can be imported safely
export const authState = {
    currentUser: null
};

//track the currently logged-in user across pages
onAuthStateChanged(auth, (user) => {        //changes current user when logs in
    const inAccountHTML = (window.location.pathname === '/account.html');
    if (user) {
        authState.currentUser = user;
        console.log("User is signed in:", authState.currentUser.email);
        if (inAccountHTML) switchToLoggedIn();
    } else {
        authState.currentUser = null;
        console.log("No user signed in");
        if (inAccountHTML) switchToLogIn();
    }
    if (inAccountHTML) initialiseSignInPage();
    addCheckToLockedLinks();
});