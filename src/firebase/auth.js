"use client";

import { onAuthStateChanged, signOut } from 'firebase/auth';
import {createContext, useContext, useState, useEffect} from 'react';
import { auth } from './firebase';

export const AuthContext = createContext({
    authUser: null,
    isLoading: true,
});

export const useFirebaseAuth = () => {

    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const authStateChanged = async (user) => {

        setIsLoading(true);

        if(!user){
            setAuthUser(null);
            setIsLoading(false);
        }
        else{
            setAuthUser({
                uid: user.uid,
                name: user.displayName,
                email: user.email
            });
            setIsLoading(false)
        }
    };

    const HandleSignOut = async () => {
        try{
            signOut(auth);

            setAuthUser(null);
            setIsLoading(false);
        }
        catch(err){
            console.log(err);
        }
        

    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, authStateChanged);

        return () => unsubscribe();

    }, []);

    return {
        authUser,
        setAuthUser,
        isLoading,
        setIsLoading,
        HandleSignOut,

    }

}

export const AuthProvider = ({children}) => {

    const auth = useFirebaseAuth();

    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
