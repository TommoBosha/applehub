import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUser, registerUser, logout } from "../auth/authSlice";

export const signUp =
    (email, password, name, surname, phone) => async (dispatch) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            await updateProfile(user, {
                phoneNumber: phone,
                photoURL: phone,
                displayName: `${name} ${surname}`,
            });

            const { uid, displayName, photoURL, accessToken, refreshToken } = user;
            const emailUser = userCredential.user.email;

            dispatch(
                registerUser({
                    userName: displayName,
                    userId: uid,
                    userEmail: emailUser,
                    phoneNumber: photoURL,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                })
            );

            dispatch(signIn(email, password));
        } catch (error) {
            return { error: error.message };
        }
    };

export const signIn = (email, password) => async (dispatch) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const { accessToken, displayName, phoneNumber, uid, refreshToken } =
            userCredential.user;
        console.log("====================================");
        console.log(userCredential);
        console.log("====================================");
        // const emailUser = userCredential.user.email;

        dispatch(
            updateUser({
                userName: displayName,
                userId: uid,
                userEmail: email,
                userPhoneNumber: phoneNumber,
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
        );
    } catch (error) {
        return { error: error.message };
    }
};

export const logOut = async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(logout());
        return true;
    } catch (error) {
        return false;
    }
};
