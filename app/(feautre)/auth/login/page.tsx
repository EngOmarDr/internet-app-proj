import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center max-w-6xl w-full m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg">

        {/* image */}
        <div className="h-[200px] sm:h-[300px] md:h-full bg-[#000842] rounded-t-lg md:rounded-t-none md:rounded-bl-lg md:rounded-tl-lg lg:p-12 p-8">
          <Image src="/images/login-image.webp" width={1000} height={1000} className="w-full h-full object-contain" alt="login-image" />
        </div>

        {/* login form */}
        <div className="flex items-center justify-center rounded-b-lg md:rounded-b-none md:rounded-tr-lg md:rounded-br-lg p-6 h-full w-full shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <form className="space-y-4">

            {/* title */}
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-bold">Login</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">Login to your account and explore a world of possibilities. Your journey begins here.</p>
            </div>

            {/* user name field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">User name</label>
              <div className="relative flex items-center">
                <input name="username" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter user name" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            {/* password field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input name="password" type="password" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600" placeholder="Enter password" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

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


            <button type="button" className="w-full !mt-8 shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700">
              Log in
            </button>


            <p className="text-sm !mt-8 text-center text-gray-800">Don't have an account <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
          </form>
        </div>
      </div>
    </div>

  );
}
