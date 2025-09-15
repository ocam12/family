import { authState } from "./firebaseAuth.js";
import { auth, db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

export async function signup(email, password, userName, birthday) {
    if (!email || !password || !userName || !birthday) {
        console.error("Missing signup fields");
        return;
    }

    try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;

        // Optional: force token refresh
        await user.getIdToken(true);

        await setDoc(doc(db, "users", user.uid), {
            userName: userName,
            birthday: birthday,
            profilePicURL: "",
        });

        console.log("Signup successful:", user.uid);
    } catch (err) {
        console.error("Signup error:", err.code, err.message);
    }
}

export async function login(email, password) {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);       //gets account with those user details
        authState.currentUser = userCred.user;      //sets user to this newly logged in one
        window.location.href = '../index.html';     //opens up main page
    } catch (err) {
        console.log(err);
    }
}

export async function logout(){
    try {
        await signOut(auth);
        authState.currentUser = null;
    } catch (err){

    }
}