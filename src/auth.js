import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
    apiKey: "AIzaSyA7bY-fo_zakYbNuuiW_1V4Wl37KCu2aHk",
    authDomain: "etv-movies-app.firebaseapp.com",
    databaseURL: "https://etv-movies-app.firebaseio.com",
    projectId: "etv-movies-app",
    storageBucket: "etv-movies-app.appspot.com",
    messagingSenderId: "1015832834810",
    appId: "1:1015832834810:web:4f87079a16199c72940f43",
    measurementId: "G-4W2MJ5W459"
});

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState({ status: "loading" });

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState({ status: "in", user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/${user.uid}/refreshTime`);

          metadataRef.on("value", async (data) => {
            if(!data.exists) return
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
    });
  }, []);

  async function signInWithGoogle() {
    await firebase.auth().signInWithPopup(provider);
  };

  async function signOut() {
    setAuthState({ status: "loading" });
    await firebase.auth().signOut();
    setAuthState({ status: "out" });
  };

  if (authState.status === "loading") {
    return null;
  } else {
    return (
      <AuthContext.Provider value={{ authState, signInWithGoogle, signOut }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export default AuthProvider;