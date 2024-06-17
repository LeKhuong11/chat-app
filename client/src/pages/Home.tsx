import { useEffect } from "react";
import ContentChat from "../layouts/ContentChat";
import ListChat from "../layouts/ListChat";
import Login from "./Login";
import { useNavigate } from 'react-router-dom';


function HomePage() {
    const token = getToken();
    const navigate = useNavigate();

    
    useEffect(() => {
        if (!token){
           return navigate("/login");
        }
     },[token]);


    return (    
        <div className="home-page">
            <div className="container mx-auto h-screen flex justify-center items-center">
                <ListChat />
                <ContentChat />
            </div>
        </div>
    );
}

function getToken() {
    const token: string | null = localStorage.getItem('token');

    console.log(token);
    
    
    if (token) {
        const userToken = JSON.parse(token);
        return userToken;
    }

    return null; 
  } 

export default HomePage;