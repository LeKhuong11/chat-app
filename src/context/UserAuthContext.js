import { Spin } from "antd";
import { 
    GoogleAuthProvider,  
    signInWithPopup, 
    signOut
} from "firebase/auth";
import {createContext, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/config'

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [ user, setUser ] = useState();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(true);
    
    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(()=> {
        const unSub = auth.onAuthStateChanged((currentUser) => {
            setLoading(false)
            if(currentUser) {
              const { displayName, email, uid, photoURL } = currentUser;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL
                })
                navigate('/')
            }
            else {
                navigate('login')
            }
        })

        //cleanup function
        return () => {
            unSub();
        }
    }, [navigate])

    return <userAuthContext.Provider value={{user, setUser, googleSignIn, logOut, }}>
        {loading ? <Spin /> : children}
    </userAuthContext.Provider>
}

export function useUserrAuth() {
    return useContext(userAuthContext);
}