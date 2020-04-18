import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD0Ah38vWGJPPHPF661cmzJfbU4k6mgvng",
  authDomain: "shopping-cart-a3aa4.firebaseapp.com",
  databaseURL: "https://shopping-cart-a3aa4.firebaseio.com",
  projectId: "shopping-cart-a3aa4",
  storageBucket: "shopping-cart-a3aa4.appspot.com",
  messagingSenderId: "67830803554",
  appId: "1:67830803554:web:c06a63809e6a8e05e5353b",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
