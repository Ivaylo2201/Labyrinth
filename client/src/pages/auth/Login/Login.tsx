import { Link, useNavigate } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import bgForm from "../../../assets/signImage.jpg";
import logo from "../../../assets/logo.png";

import { SetStateAction, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState<null | boolean>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<null | boolean>(null);

  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  // let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailAddress(value);
      setEmailIsValid(value ? emailRegex.test(value) : null);
    } else if (name === "password") {
      setPasswordIsValid(value.length >= 8 ? true : false);
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let msg: SetStateAction<string[]> = [];
    setErrorMsg(msg);

    if (!(emailIsValid && passwordIsValid)) {
      return;
    }

    setLoading(true);
    try {
      await login(emailAddress, password, navigate);
      setServerMsg("");
    } catch (error: any) {
      setServerMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg2})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/5  backdrop-blur-md bg-[#E0E0E0]  bg-opacity-60 rounded-lg flex justify-center text-center flex-row">
          <div className="w-1/2 bg-white flex flex-col items-center">
            <h1 className="text-2xl font-semibold uppercase tracking-wide pt-10 pb-2">Welcome</h1>
            <img src={logo} alt="logo" className="w-36 h-36" />
            <p className="pb-4">Don't have an account?</p>
            <Link
              to="/register"
              className="text-md  font-semibold text-black border-black border-2
            px-2 rounded-full hover:text-white hover:bg-black transition-all duration-300"
            >
              Create an account
            </Link>
          </div>
          <div
            className="w-1/2 relative inset-0 bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${bgForm})` }}
          >
            <h2 className="text-3xl text-center pt-8 pb-5 text-white font-semibold -tracking-tighter ">
              Login
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col items-center gap-5 pb-5 pt-4"
            >
              <input
                type="text"
                name="email"
                value={emailAddress}
                onChange={onChange}
                id="email"
                placeholder="Email"
                className={`px-2 py-1 text-sm w-full ${
                  emailIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${emailIsValid === null || emailIsValid === true ? "" : ""}`}
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                id="password"
                placeholder="Password"
                className={`px-2 py-1 text-sm w-full ${
                  passwordIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${passwordIsValid === null || passwordIsValid === true ? "" : ""}`}
              />

              <span className="flex items-center justify-between w-full">
                <input
                  type="submit"
                  value="Login"
                  className="text-white px-4 border-white border-2 rounded-full  hover:bg-white hover:text-black transition-all duration-300 cur"
                />
                <Link to="/forgot-password" className="text-md  font-light text-white">
                  Forgot password?
                </Link>
              </span>
              <p className="text-red-400 text-sm mt-2">
                {Array.isArray(errorMsg)
                  ? errorMsg.map((msg, index) => (
                      <span key={index}>
                        {msg}
                        <br />
                      </span>
                    ))
                  : errorMsg}
              </p>
              {serverMsg && <p className="text-red-400 text-sm mt-2">{serverMsg}</p>}
            </form>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loading-spinner">
            <svg
              className="animate-spin h-16 w-16 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
