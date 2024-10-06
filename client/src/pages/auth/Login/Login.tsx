import { Link } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import { useState } from "react";

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState<null | boolean>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<null | boolean>(null);

  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const emailBorderColor =
    emailIsValid === null
      ? "border-black" // Empty state
      : emailIsValid
      ? "border-green-500" // Valid state
      : "border-red-500"; // Invalid state

  // Determine border color based on password validity
  const passwordBorderColor =
    passwordIsValid === null
      ? "border-black" // Empty state
      : passwordIsValid
      ? "border-green-500" // Valid state
      : "border-red-500"; // Invalid state

  return (
    <div className="relative w-full overflow-hidden h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg2})` }} // Dynamically set background image
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-72  h-min backdrop-blur-md bg-[#E0E0E0]  bg-opacity-60 p-4 rounded-lg flex justify-center text-center flex-col">
          <h2 className="text-3xl text-center pb-8">Login</h2>
          <form action="" className="flex justify-center flex-col items-center">
            <input
              type="text"
              name="email"
              value={emailAddress}
              onChange={onChange}
              id="email"
              placeholder="Email..."
              style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 ${emailBorderColor} placeholder-black mb-5 focus:outline-none -webkit-autofill-bg-transparent`}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              id="password"
              placeholder="Password..."
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 ${passwordBorderColor} placeholder-black mb-5 focus:outline-none `}
            />
            <input
              type="submit"
              value="Sign in"
              className="text-xl font-bold text-white bg-[#212121] rounded-md p-2 w-44 hover:bg-[#393939] transition-colors duration-300 cursor-pointer"
            />
          </form>
          <Link to="/forgot-password" className="text-md mt-3 font-light text-[#551a6e]">
            Forgot password?
          </Link>
          <p className="text-md mt-3 font-light ">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#551a6e]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
