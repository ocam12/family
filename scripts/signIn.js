import { login, logout, signup } from "./auth.js";
import { addEvent } from "./common.js";

const signupPressed = () => {       //signup button pressed
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const userName = document.getElementById('signupUserName').value;
    const birthday = document.getElementById('signupBirthday').value;

    if (!checkEmail(email)){
        displayMessage('Please enter a valid email', 'error')
    }

    const passwordResult = checkPassword(password);
    if(!passwordResult.valid){
        displayMessage(passwordResult.message, 'error')
    }

    signup(email, password, userName, birthday);
}

const loginPressed = () => {       //login button pressed
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    login(email, password);
}

const emailErrors = (emailInput) => {
    if (!checkEmail(emailInput.value) && emailInput.value !== ''){
        emailInput.className = 'error';
        displayMessage('Please enter a valid email', 'error')
        return;
    }
    emailInput.className = '';
    displayMessage('', 'error')
}

const checkEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const passwordErrors = (passwordInput) => {
    const passwordResult = checkPassword(passwordInput.value);
    if (!passwordResult.valid && passwordInput.value !== ''){
        passwordInput.className = 'error';
        displayMessage(passwordResult.message, 'error')
        return;
    }
    passwordInput.className = '';
    displayMessage('', 'error')
}

const checkPassword = (password) => {
    if (password.length < 8){
        return { valid: false, message: 'Please ensure password is at least 8 characters long'}
    }
    return {valid: true}
}

const displayMessage = (message, type) => {
    const messageP = document.getElementById('messageP');
    messageP.innerText = message;
    messageP.className = type;
}

export const initialiseSignInPage = async () => {
    //intialises signup and login buttons
    const signupButton = document.getElementById('signupButton');
    if (signupButton){resetAndInitialiseButton(signupButton, signupPressed, []);}

    const loginbutton = document.getElementById('loginButton');
    if (loginbutton){resetAndInitialiseButton(loginbutton, loginPressed, []);}

    const createAccountButton = document.getElementById('createAccountButton');
    if (createAccountButton){resetAndInitialiseButton(createAccountButton, switchToSignUp, []);}

    const gotAccountButton = document.getElementById('gotAccountButton');
    if (gotAccountButton){resetAndInitialiseButton(gotAccountButton, switchToLogIn, []);}

    const signupEmail = document.getElementById('signupEmail');
    if (signupEmail){addEvent(signupEmail, 'input', emailErrors, [signupEmail]);}

    const signupPassword = document.getElementById('signupPassword');
    if (signupPassword){addEvent(signupPassword, 'input', passwordErrors, [signupPassword]);}

    const signOutButton = document.getElementById('signOutButton');
    if (signOutButton){
        addEvent(signOutButton, 'click', logout, []);
    }
}

const resetAndInitialiseButton = (button, func, params) => {
    const clone = button.cloneNode(true);
    addEvent(clone, 'click', func, [...params]);
    button.replaceWith(clone);
}

const switchToSignUp = () => {
    getSignUpMenu().classList.remove('hidden');
    getLogInMenu().classList.add('hidden');
    getLoggedInMenu().classList.add('hidden');
}

export const switchToLogIn = () => {
    getSignUpMenu().classList.add('hidden');
    getLogInMenu().classList.remove('hidden');
    getLoggedInMenu().classList.add('hidden');
    
    initialiseSignInPage();
}

export const switchToLoggedIn = () => {
    getSignUpMenu().classList.add('hidden');
    getLogInMenu().classList.add('hidden');
    getLoggedInMenu().classList.remove('hidden');
}

const getSignUpMenu = () => {
    return document.getElementById('signUpMenu');
}

const getLogInMenu = () => {
    return document.getElementById('logInMenu');
}

const getLoggedInMenu = () => {
    return document.getElementById('loggedInMenu');
}