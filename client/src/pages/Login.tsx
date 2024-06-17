import { Link } from "react-router-dom";
import { UserLogin } from "../types/user";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import UserApi from "../apis/User";


function Login() {
    const [ userLogin, setUserLogin ] = useState<UserLogin>({ email: '', password: '' });
    const navigate = useNavigate();
    const userApi = new UserApi();
    

    function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const userCredentials: UserLogin = {
            email: userLogin.email || '',
            password: userLogin.password || ''
          };

          userApi.login(userCredentials)
            .then(res => {
                navigate('/');
                
                localStorage.setItem('token', JSON.stringify(res.user.token));
                notification.success({
                    message: 'Login successfully!',
                    description: 'Welcome to Chat App!'
                  });
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLogin({ ...userLogin, email: event.target.value });
      };
      
      const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLogin({ ...userLogin, password: event.target.value });
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
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitLogin}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input 
                                    value={userLogin.email} 
                                    onChange={handleEmailChange} 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="name@company.com" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                    value={userLogin.password} 
                                    onChange={handlePasswordChange}
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required 
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/register">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>  
    );
};

export default Login;