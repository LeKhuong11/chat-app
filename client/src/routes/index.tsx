import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/Home";
import Register from "../pages/Register";


export function Router() {
    let element = useRoutes([
        {
            path: 'login',
            element: <Login />,
            children: [
                
            ]
        },
        {
            path: 'register',
            element: <Register />,
            children: [
                
            ]
        },
        {
            path: '/',
            element: <HomePage />,

        }
    ]);

    return element;
}