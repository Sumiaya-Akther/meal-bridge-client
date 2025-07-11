import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    const createUser = (email, password) => {
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setloading(true);
        return signInWithEmailAndPassword(auth, email, password);

    };


    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };


    const signInWithGoogle = async () => {
        setloading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    };

    const logOut = () => {
        setloading(true);
        return signOut(auth);
    };

    const userInfo = {
        createUser,
        user,
        setUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        loading,
        setloading,

    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('user in the auth state change', currentUser)
            setloading(false);
        });

        return () => {
            unSubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
