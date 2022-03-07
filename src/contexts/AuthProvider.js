import { createContext, useState, useEffect, useContext } from "react";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"
export const AuthContext = createContext()

// to make your own React Hook
export function useAuth() {
    return useContext( AuthContext )
}

const AuthProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState( { loggedIn: false } )
    let auth = getAuth();
    const provider = new GoogleAuthProvider();
    const db = getFirestore()
    const signIn = () => {
        return setPersistence( auth, browserLocalPersistence )
                .then ( () => {
                    signInWithPopup( auth, provider)
                        .then( result => {
                            console.log( result )
                        })
                })
                .catch( err => console.log( err ))
    }
    const logOut = () => {
        signOut( auth )
            .then( () => {
                setCurrentUser( { loggedIn: false } )
                console.log('User logged out successfully')
            } )
    }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // once the user logs in, we need to add them to the database as a reference
            // query the users collection to find the user
            const useRef = doc( db, 'users', user.uid)
            // if that user doesn't exist, add them to the database
            // otherwise, if the user does exist, overwrite (don't duplicate) their information
            setDoc( useRef, { email: user.email, name: user.displayName}, { merge: true } )
            setCurrentUser({
                id: user.uid,
                name: user.displayName,
                image: user.photoURL,
                email: user.email,
                loggedIn: true
            });
          return unsubscribe
        }
      });
    }, [ auth, db ]);
    
    const values = {
      signIn,
      currentUser,
      logOut
    };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;