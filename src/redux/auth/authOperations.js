
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { setUser } from "./authSlice";



// export const signUp = async (name, surname, phone, email, password) => {
//     try {
//         const userCredential = await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//         );
//         const user = userCredential.user;
//         await addDoc(collection(db, "users"), {
//             uid: user.uid,
//             email: user.email,
//             name,
//             surname,
//             phone,
//         });
//         return true;
//     } catch (error) {
//         console.log(error);
//         return { error: error.message };
//     }
// };

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
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
            phone: user.phone,
            name: user.name,
            surname: user.surname,
        });
        dispatch(
            setUser({
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: user.refreshToken,
                id: user.uid,
            })
        );
        return true
    } catch (error) {
        return { error: error.message }
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
        console.log(user)
        dispatch(
            setUser({
                token: user.refreshToken,
                uid: user.uid,
            })
        );
        return true
    } catch (error) {
        return { error: error.message }
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