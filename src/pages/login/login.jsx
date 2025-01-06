import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import CustomField from "../../components/CustomField";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constant";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await AuthService.loginUser(data.username, data.password);

            localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
            localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token);
            res.data.roles[0] === 'admin' 
            ? localStorage.setItem('isAdmin', true)
            : localStorage.setItem('isAdmin', false)
            navigate('/home');

        } catch (error) {
            alert(error);
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
        {/* <div className="fixed top-4 right-4 flex items-center">

            <ToggleTheme ></ToggleTheme>
            <LanguageSelector ></LanguageSelector>
        </div> */}
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center dark:bg-slate-300 max-w-6xl m-4 shadow-[0px_0px_5px_1px_rgba(93,96,127,0.9)] dark:shadow-white rounded-lg">

                {/* image */}
                <div className="h-[200px] sm:h-[300px] md:h-full bg-[#000842] rounded-t-lg md:rounded-none md:rounded-s-lg lg:p-12 p-8">
                    <img src="/images/login-image.webp" className="w-full h-full object-scale-down" alt="login-image" />
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

                        <span className="flex justify-center items-center">

                            <button type="submit" className=" shadow-xl max-w-[300px] w-full py-3 text-sm rounded-lg text-white bg-blue-600 dark:bg-blue-900 hover:bg-blue-700">
                                {t("login")}
                            </button>
                        </span>


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