import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getIdToken,
  getIdTokenResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase/config";
import { updateUser } from "../auth/authSlice";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const signUp =
  (email, password, surname, name, phone) => async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = userCredential.user;

      await setDoc(doc(db, "users", uid), {
        name: `${name} ${surname}`,
        phone,
        email,
        uid,
      });

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

export const singInWithGoogle = async (dispatch) => {
  try {
    const userCredential = await signInWithRedirect(auth, provider);
    const credentials = GoogleAuthProvider.credentialFromResult(userCredential);
    getAdditionalUserInfo(userCredential);

    const { localId, displayName, email, refreshToken, accessToken, idToken } =
      credentials;

    await getDocs(query(collection(db, "users"), where("uid", "==", localId)));

    setDoc(doc(db, "users", localId), {
      name: displayName,
      email: email,
      uid: localId,
    });

    console.log("====================================");
    console.log(userCredential, credentials);
    console.log("====================================");

    updateUser({
      userId: localId,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    signInWithCustomToken(auth, idToken);
  } catch (error) {
    const credential = GoogleAuthProvider.credentialFromError(error);
    return { credential, error: error.message };
  }
};

export const signInWithToken = (accessToken) => {
  try {
    const userCredential = signInWithCustomToken(auth, accessToken);
    // userCredential.user.getIdToken(true).then((newAccessToken) => {
    //   getIdTokenResult().then((idTokenResult) => {
    //     idTokenResult.claims.accessToken = newAccessToken;
    //     return getIdToken(true);
    //   });
    // });

    const { uid, accessToken, refreshToken } = userCredential.user;

    console.log("=================cust token===================");
    console.log(userCredential.user);
    console.log("====================================");

    updateProfile({
      userId: uid,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return { error: error.message };
  }
};

export const logOut = () => {
  try {
    signOut();
  } catch (error) {
    return { error: error.message };
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
