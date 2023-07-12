import {
    createUserWithEmailAndPassword,
    getIdToken,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { setUser } from "./authSlice";

export const signUp = async (email, password, phone, name, surname, dispatch) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
            phone,
            name,
            surname
        );
        const user = userCredential.user;

        const accessToken = await getIdToken(user);

        await updateProfile(auth.currentUser, {
            displayName: `${name} ${surname}`,
            phoneNumber: phone,
        });
        console.log("accessToken:", accessToken);
        dispatch(
            setUser({
                email: auth.currentUser.email,
                phone: auth.currentUser.phoneNumber,
                accessToken: accessToken,
                id: auth.currentUser.uid,
            })
        );

        return true;
    } catch (error) {
        return { error: error.message };
    }
};

export const signIn = async (email, password, dispatch) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        const accessToken = await getIdToken(user);
        console.log("accessToken:", accessToken);
        dispatch(
            setUser({
                email: auth.currentUser.email,
                accessToken: accessToken,
                uid: auth.currentUser.uid,
            })
        );

        return true;
    } catch (error) {
        return { error: error.message };
    }
};

export const logOut = async () => {
    try {
        await signOut(auth)
        return true
    } catch (error) {
        return false
    }
};