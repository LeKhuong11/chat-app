import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { UserContextType } from "../types/user"; // Assume UserProfile and UserContextType are imported
import { useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({ children }: Props) {
    const [user, setUser] = useState<UserContextType['user']>(null);
    const [token, setToken] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();


    const updateUserLogin = useCallback((info: UserContextType['user']) => {
        setUser(info);
    }, [])
    

    useEffect(() => {
        const users = localStorage.getItem("user");
        const tokens = localStorage.getItem("token");
    
        console.log(users, tokens);

        if (users && tokens) {
            setUser(JSON.parse(users));
            setToken(tokens);
        } else {
            setIsLoggedIn(false);
            navigate('/login');
        }
          setIsLoggedIn(true);
    }, [])


    return (
        <UserContext.Provider value={{user, token, isLoggedIn, updateUserLogin}}>
            {isLoggedIn ? children : null}
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext(UserContext);