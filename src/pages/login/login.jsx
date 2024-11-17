import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import CustomField from "../../components/CustomField";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ToggleTheme from "../../components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../components/LanguageSelector";
import { useForm } from "react-hook-form";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        try {
            const res = await AuthService.loginUser(data.username, data.password);
            console.log(res);
            
            
            if (res.status === 1 && res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                navigate('/home');
            } else {
                alert("Error: " + res.message);
            }
        } catch (error) {
            console.log(error);
            Toastify({
                text: "Invalid credentials: " + error.response.data.message,
                duration: 5000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                stopOnFocus: true,
            }).showToast();
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation()

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };


    return (<>
        <div className="fixed top-4 right-4 flex items-center">

            <ToggleTheme ></ToggleTheme>
            <LanguageSelector ></LanguageSelector>
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center dark:bg-slate-300 max-w-6xl w-full m-4 shadow-[2px_2px_10px_-3px_rgba(6,81,237,0.9)] rounded-lg">

                {/* image */}
                <div className="h-[200px] sm:h-[300px] md:h-full bg-[#000842] rounded-t-lg md:rounded-s-lg md:rounded-t-none lg:p-12 p-8">
                    <img src="/images/login-image.webp" className="w-full h-full object-contain" alt="login-image" />
                </div>

                {/* login form */}
                <div className="flex items-center justify-center md:rounded-e-lg p-6 h-full w-full shadow-[2px_2px_22px_-4px_rgba(93,96,127,0.9)] max-md:mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full" >

                        {/* title */}
                        <div className="mb-8">
                            <h3 className="text-gray-800 text-3xl font-bold">{t("login")}</h3>
                            <p className="text-gray-500 text-sm mt-4 leading-relaxed">{t("login_intro")}</p>
                        </div>

                        {/* user name field */}
                        <CustomField
                            placeholder={t("username")}
                            name="username"
                            type="text"
                            {...register("username", { required: true })}
                        >
                            <FaRegUser
                                className="w-4 h-4 absolute end-4"
                                fill="#bbb"
                            />
                        </CustomField>
                        {errors.username && <span className="text-red-500 text-sm">{t("required")}</span>}

                        {/* password field */}
                        <CustomField
                            placeholder={t("password")}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: true })}
                        >
                            {
                                showPassword
                                    ? <AiOutlineEyeInvisible
                                        className="w-4 h-4 absolute end-4 cursor-pointer"
                                        onClick={handleTogglePassword}
                                    />
                                    : <AiOutlineEye
                                        className="w-4 h-4 absolute end-4 cursor-pointer"
                                        onClick={handleTogglePassword}
                                    />
                            }
                        </CustomField>
                        {errors.password && <span className="text-red-500 text-sm">{t("required")}</span>}

                        <button type="submit" className="w-full mx-0 !mt-7 shadow-xl py-3 text-sm tracking-wide rounded-lg text-white bg-blue-600 dark:bg-blue-900 hover:bg-blue-700">
                            {t("login")}
                        </button>


                        <p className="text-sm !mt-8 text-center text-gray-800">
                            {t("not_account")}
                            <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                                {t("reg_here")}
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
}