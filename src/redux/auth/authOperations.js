import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUser, registerUser } from "../auth/authSlice";

export const signUp = (name, surname, email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await updateProfile(user, {
      displayName: `${name} ${surname}`,
    });

    const { uid, accessToken, refreshToken } = user;

    dispatch(
      registerUser({
        userId: uid,
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

    const { uid, accessToken, refreshToken } = userCredential.user;

    dispatch(
      updateUser({
        userId: uid,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    );
  } catch (error) {
    return { error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut();
  } catch (error) {
    return { error: error.message };
  }
};
