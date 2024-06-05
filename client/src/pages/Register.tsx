import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { IuserRegister } from "../types/user";
import UserApi from "../apis/user";

const userApi = new UserApi();

function Register() {
    const [ userRegister, setUserRegister ] = useState<IuserRegister>({name: '', email: '', password: ''});

    const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const userCredentials: IuserRegister = {
            name: userRegister.name || '',
            email: userRegister.email || '',
            password: userRegister.password || ''
        };

        userApi.register(userCredentials)
            .then(data => {

            })
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegister({ ...userRegister, name: event.target.value });
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegister({ ...userRegister, email: event.target.value });
    };
      
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegister({ ...userRegister, password: event.target.value });
    };

    return (
        <section className="h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                    Chat App
                </a>
                <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-custom-bg">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmitRegister}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                <input 
                                    value={userRegister.name} 
                                    onChange={handleNameChange} 
                                    type="text" 
                                    name="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="David Ng" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input 
                                    value={userRegister.email} 
                                    onChange={handleEmailChange} 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="name@email.com" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                    value={userRegister.password} 
                                    onChange={handlePasswordChange} 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required 
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/login">Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>  
    )
};  

export default Register;