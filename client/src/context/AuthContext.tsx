import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserContextType } from "../types/user"; // Assume UserProfile and UserContextType are imported
import { useNavigate } from "react-router-dom";

type Props = {
    children: ReactNode
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserContextProvider({ children }: Props) {
    const [user, setUser] = useState<UserContextType['user'] | null>(null);
    const [token, setToken] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
        } else {
            setIsLoggedIn(false);
            navigate('/login');
        }
          setIsLoggedIn(true);
    }, [])


    return (
        <UserContext.Provider value={{user, token, isLoggedIn}}>
            {isLoggedIn ? children : null}
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext(UserContext);