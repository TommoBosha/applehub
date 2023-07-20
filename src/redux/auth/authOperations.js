import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getIdToken,
  getIdTokenResult,
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../firebase/config";
import { updateUser } from "../auth/authSlice";

export const signUp = (email, password) => async (dispatch) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

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
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    return { error: error.message };
  }
};

export const onAuthState = () => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, accessToken, refreshToken } = user;
        updateUser({ userId: uid, accessToken: accessToken, refreshToken });
      } else {
        logOut();
      }
    });
  } catch (error) {
    return { error: error.message };
  }
};

export const signInWithToken = (accessToken) => {
  try {
    signInWithCustomToken(auth, accessToken).then((userCredential) => {
      setInterval(() => {
        userCredential.user.getIdToken(true).then((newAccessToken) => {
          getIdTokenResult().then((idTokenResult) => {
            idTokenResult.claims.accessToken = newAccessToken;
            return getIdToken(true);
          });
        });
      }, 3600000);

      const { uid, accessToken, refreshToken } = userCredential.user;

      console.log("=================cust token===================");
      console.log(userCredential.user);
      console.log("====================================");

      updateProfile({
        userId: uid,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    });
  } catch (error) {
    return { error: error.message };
  }
};

export const singInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider).then((result) => {
      const credentials = GoogleAuthProvider.credentialFromResult(result);
      getAdditionalUserInfo(result);

      console.log("====================================");
      console.log(credentials, result);
      console.log("====================================");
      updateUser({
        userId: result.user.id,
        accessToken: result.user.accessToken,
        refreshToken: result.user.refreshToken,
      });
    });
  } catch (error) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    return { credential, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut();
  } catch (error) {
    return { error: error.message };
  }
};
