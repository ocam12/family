import { getAllUserProfiles, getUserProfile } from "./auth.js";
import { authState, getCurrentUser, handleUser } from "./firebaseAuth.js";

const initialiseAccountPage = async () => {
    const user = await getCurrentUser();
    if (!user){return;}

    const userProfile = await getUserProfile(user.uid);
    changeLoggedInText(userProfile.userName, );
};

const changeLoggedInText = (userName) => {
    
    const welcomeText = document.getElementById('loggedInWelcomeText');
    welcomeText.innerText = `Welcome back ${userName}`;
}

initialiseAccountPage();