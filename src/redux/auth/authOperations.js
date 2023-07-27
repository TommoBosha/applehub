import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { updateUser } from "../auth/authSlice";
import { doc, setDoc } from "firebase/firestore";

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

// export const onAuthState = async () => {
//   try {
//     const currentUser = await onAuthStateChanged(auth, (currentUser) => {
//       console.log("====================================");
//       console.log(currentUser);
//       console.log(currentUser.uid);
//       console.log(currentUser.accessToken);
//       console.log(currentUser.refreshToken);
//       console.log("====================================");

//       signInWithCustomToken(auth, currentUser.accessToken);
//     });
//     console.log("====================================");
//     console.log(currentUser);
//     console.log("====================================");
//   } catch (error) {
//     return { error: error.message };
//   }
// };

// export const singInWithGoogle = async (dispatch) => {
//   try {
//     const userCredential = await signInWithRedirect(auth, provider);
//     const credentials = GoogleAuthProvider.credentialFromResult(userCredential);
//     getAdditionalUserInfo(userCredential);

//     const { localId, displayName, email, refreshToken, accessToken, idToken } =
//       credentials;

//     await getDocs(query(collection(db, "users"), where("uid", "==", localId)));

//     setDoc(doc(db, "users", localId), {
//       name: displayName,
//       email: email,
//       uid: localId,
//     });

//     console.log("====================================");
//     console.log(userCredential, credentials);
//     console.log("====================================");

//     updateUser({
//       userId: localId,
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     });

//     signInWithCustomToken(auth, idToken);
//   } catch (error) {
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     return { credential, error: error.message };
//   }
// };

// export const signInWithToken = (token) => (dispatch) => {
//   try {
//     const userCredential = signInWithCustomToken(auth, token);
//     const { uid, accessToken, refreshToken } = userCredential.user;

//     console.log("=================cust token===================");
//     console.log(userCredential.user);
//     console.log("====================================");

//     dispatch(
//       updateProfile({
//         userId: uid,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//       })
//     );
//   } catch (error) {
//     return { error: error.message };
//   }
// };

export const logOut = () => {
  try {
    signOut();
  } catch (error) {
    return { error: error.message };
  }
};

// export const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     console.log("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
