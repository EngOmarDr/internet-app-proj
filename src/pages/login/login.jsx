import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { CustomField } from "../../components/CustomField";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const navigate = useNavigate();
    console.log(username);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await AuthService.loginUser(username, password);

            if (data.status === 1 && data.data.token) {
                localStorage.setItem('authToken', data.data.token);
                navigate('/home'); // إعادة توجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            alert("Invalid credentials");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center max-w-6xl w-full m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg">

                {/* image */}
                <div className="h-[200px] sm:h-[300px] md:h-full bg-[#000842] rounded-t-lg md:rounded-t-none md:rounded-bl-lg md:rounded-tl-lg lg:p-12 p-8">
                    <img src="/images/login-image.webp" className="w-full h-full object-contain" alt="login-image" />
                </div>

                {/* login form */}
                <div className="flex items-center justify-center rounded-b-lg md:rounded-b-none md:rounded-tr-lg md:rounded-br-lg p-6 h-full w-full shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                    <form onSubmit={handleLogin} className="space-y-4" >

                        {/* title */}
                        <div className="mb-8">
                            <h3 className="text-gray-800 text-3xl font-bold">Login</h3>
                            <p className="text-gray-500 text-sm mt-4 leading-relaxed">Login to your account and explore a world of possibilities. Your journey begins here.</p>
                        </div>

                        {/* user name field */}
                        <CustomField
                            placeholder="Username"
                            name="username"
                            type="text"
                            onChange={setUsername}
                            value={username}
                        >
                            <FaRegUser
                                className="w-4 h-4 absolute right-4"
                                fill="#bbb"
                            />
                        </CustomField>

                        {/* password field */}
                        <CustomField
                            placeholder="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={setPassword}
                        >
                            {
                                showPassword
                                    ? <AiOutlineEyeInvisible
                                        className="w-4 h-4 absolute right-4 cursor-pointer"
                                        onClick={handleTogglePassword}
                                    />
                                    : <AiOutlineEye
                                        className="w-4 h-4 absolute right-4 cursor-pointer"
                                        onClick={handleTogglePassword}
                                    />
                            }
                        </CustomField>



                        {/* <div className="flex flex-wrap items-center justify-between gap-4"> 
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  Remember me
                </label>
              </div> 

              <div className="text-sm">
                <a href="jajvascript:void(0);" className="text-blue-600 hover:underline font-semibold">
                  Forgot your password?
                </a>
              </div>
            </div> */}


                        <button type="submit" className="w-full mx-0 !mt-7 shadow-xl py-3 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700">
                            Log in
                        </button>


                        <p className="text-sm !mt-8 text-center text-gray-800">
                            Dont have an account
                            <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    );
}