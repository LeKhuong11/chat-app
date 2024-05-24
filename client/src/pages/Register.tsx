import { Link } from "react-router-dom";
import Button from "../components/Button";

function Register() {

    function handleClickLogin() {
        console.log('Hello');
        
    }

    return (
        <div className="login w-full h-screen flex flex-col justify-center items-center p-4 sm:p-8 md:p-12">
        <h2 className="text-2xl sm:text-3xl text-white font-mono">Register</h2>
        <input 
            type="text" 
            placeholder="Email" 
            className="my-3 border-none w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h bg-custom-bg outline-none text-white px-5 py-2 rounded-md"
        />
        <input 
            type="text" 
            placeholder="Nick name" 
            className="my-3 border-none w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h bg-custom-bg outline-none text-white px-5 py-2 rounded-md"
        />
        <Button onClick={handleClickLogin} children="Register" />
        <Link to="/login" className="underline">Login</Link>
    </div>
    )
};  

export default Register;