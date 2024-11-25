import { Link, useNavigate } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import bgForm from "../../../assets/signImage.jpg";
import logo from "../../../assets/logo.png";

import { SetStateAction, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { ClipLoader } from "react-spinners";

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

      <div className="absolute inset-0 flex items-center justify-center w-full">
        {/* <div className="bg-slate-700 w-full absolute top-0">
          <Link
            to="/"
            className="absolute z-20 top-0 left-0 m-1 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-600 hover:text-white duration-200"
          >
            Back to home
          </Link>
          <Link
            to="/register"
            className="lg:hidden absolute z-20 top-0 right-0 m-1 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-600 hover:text-white duration-200"
          >
            Go to sign up
          </Link>
        </div> */}

        <div className="w-2/3 lg:w-1/2 h-96 backdrop-blur-md bg-[#E0E0E0]  bg-opacity-60 rounded-lg flex justify-center text-center flex-row">
          <div className="hidden lg:block lg:w-1/2 bg-white lg:flex flex-col items-center rounded-l-lg">
            <h1 className="text-2xl font-semibold uppercase tracking-wide pt-10 pb-2">Welcome</h1>
            <img src={logo} alt="logo" className="w-36 h-36" />
            <p className="pb-4 text-lg">Don't have an account?</p>
            <Link
              to="/register"
              className="text-lg font-semibold text-black border-black border-2
            px-2 rounded-full hover:text-white hover:bg-black transition-all duration-300"
            >
              Create an account
            </Link>
          </div>
          <div
            className="w-full lg:w-1/2 relative inset-0 bg-cover bg-center p-4 rounded-lg lg:rounded-r-lg align-middle t"
            style={{ backgroundImage: `url(${bgForm})` }}
          >
            <h2 className="text-4xl lg:text-3xl text-center pt-8 pb-5 lg:pb-8 text-gray-200 font-semibold -tracking-tighter ">
              Login
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col items-center gap-6 pb-5 pt-10"
            >
              <input
                type="text"
                name="email"
                value={emailAddress}
                onChange={onChange}
                id="email"
                placeholder="Email"
                className={`px-2 py-2 text-md w-full ${
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
                className={`px-2 py-2 text-md w-full ${
                  passwordIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${passwordIsValid === null || passwordIsValid === true ? "" : ""}`}
              />

              <span className="w-full">
                <span className="flex flex-col lg:flex-row gap-2 items-center justify-between w-full">
                  <input
                    type="submit"
                    value="Login"
                    className="text-white lg:px-4 lg:py-1 w-full lg:w-auto p-2 border-white border-2 rounded-full text-xl lg:text-lg hover:bg-white hover:text-black transition-all duration-300 cur"
                  />
                  <Link to="/forgot-password" className="text-lg  font-light text-white">
                    Forgot password?
                  </Link>
                </span>
                <p className="text-red-400 text-sm ">
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
              </span>
            </form>
          </div>
        </div>
      </div>
      {loading && (
        <div className="sweet-loading h-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <ClipLoader size={150} color={"#ffff"} className="w-3" loading={loading} />
        </div>
      )}
    </div>
  );
}
