import { Link, useNavigate } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import { useState } from "react";
import bgForm from "../../../assets/signImage.jpg";
import logo from "../../../assets/logo.png";
import axios, { AxiosError } from "axios";
import { ClipLoader } from "react-spinners";

export default function Register() {
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState<null | boolean>(null);
  const [phoneValid, setPhoneIsValid] = useState<null | boolean>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<null | boolean>(null);
  const [rePasswordIsValid, setRePasswordIsValid] = useState<null | boolean>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let phoneRegex = /^(?:\+359|0)\d{9}$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;

  let inputStyle = `px-2 lg:py-1 py-2 text-sm w-full`;
  const fieldValidators: Record<string, (value: string) => boolean> = {
    email: (value) => emailRegex.test(value),
    phone: (value) => phoneRegex.test(value),
    password: (value) => value.length >= 8,
    rePassword: (value) => value === password,
  };

  const fieldSetters: Record<string, React.Dispatch<React.SetStateAction<any>>> = {
    email: setEmailAddress,
    phone: setPhoneNumber,
    password: setPassword,
    rePassword: setRePassword,
  };

  const validationSetters: Record<string, React.Dispatch<React.SetStateAction<boolean | null>>> = {
    email: setEmailIsValid,
    phone: setPhoneIsValid,
    password: setPasswordIsValid,
    rePassword: setRePasswordIsValid,
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (fieldSetters[name]) {
      fieldSetters[name](value);
    }

    if (fieldValidators[name]) {
      const isValid = fieldValidators[name](value);
      validationSetters[name](isValid);
    }

    if (name === "password" || name === "rePassword") {
      setRePasswordIsValid(rePassword === value || value === password);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(emailIsValid && phoneValid && passwordIsValid && rePasswordIsValid)) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch("http://localhost:8000/api/auth/reset", {
        email: emailAddress,
        phone_number: phoneNumber,
        password: password,
        password_confirmation: rePassword,
      });

      if (response.status === 200) {
        setErrorMessage("Password successfully changed.");
        navigate("/login");
      }
    } catch (error: AxiosError | any) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full overflow-hidden h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg2})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

      <div className="absolute inset-0 flex items-center justify-center w-full rounded-lg">
        <div className="bg-slate-700 w-full absolute top-0">
          <Link
            to="/"
            className="absolute z-20 top-0 left-0 m-1 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-600 hover:text-white duration-200"
          >
            Back to home
          </Link>
          <Link
            to="/login"
            className="lg:hidden absolute z-20 top-0 right-0 m-1 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-600 hover:text-white duration-200"
          >
            Go to sign in
          </Link>
        </div>
        <div className="lg:w-3/5  rounded-lg backdrop-blur-md bg-[#E0E0E0]  bg-opacity-60  flex justify-center text-center flex-row">
          <div className="w-1/2 bg-white flex-col items-center hidden lg:flex lg:rounded-l-lg">
            <h1 className="text-2xl font-semibold uppercase tracking-wide pt-10 pb-2">Welcome</h1>
            <img src={logo} alt="logo" className="w-36 h-36" />
            <p className="pb-4">Remember your password?</p>
            <Link
              to="/login"
              className="text-md  font-semibold text-black border-black border-2
            px-2 rounded-full hover:text-white hover:bg-black transition-all duration-300"
            >
              Sign in
            </Link>
          </div>
          <div
            className="w-full lg:w-1/2 relative inset-0 bg-cover bg-center p-4 rounded-lg lg:rounded-none lg:rounded-r-lg"
            style={{ backgroundImage: `url(${bgForm})` }}
          >
            <h2 className="text-3xl text-center pt-8 pb-5 text-white font-semibold -tracking-tighter ">
              Forgot password
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col items-center gap-5 pb-10 pt-4"
            >
              <input
                type="text"
                name="email"
                value={emailAddress}
                onChange={onChange}
                id="email"
                placeholder="Email"
                className={`${inputStyle} ${
                  emailIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${emailIsValid === null || emailIsValid === true ? "" : ""}`}
              />
              <input
                type="text"
                name="phone"
                value={phoneNumber}
                onChange={onChange}
                id="phone"
                placeholder="Phone number"
                className={`${inputStyle} ${
                  phoneValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${phoneValid === null || phoneValid === true ? "" : ""}`}
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                id="password"
                placeholder="New password"
                className={`${inputStyle} ${
                  passwordIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${passwordIsValid === null || passwordIsValid === true ? "" : ""}`}
              />
              <input
                type="password"
                name="rePassword"
                value={rePassword}
                onChange={onChange}
                id="rePassword"
                placeholder="Confirm password"
                className={`${inputStyle} ${
                  rePasswordIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${rePasswordIsValid === null || rePasswordIsValid === true ? "" : ""}`}
              />

              <input
                type="submit"
                value="Reset"
                className="text-white lg:px-5 lg:py-1 w-full lg:w-auto p-2 text-lg border-white border-2 rounded-full  hover:bg-white hover:text-black transition-all duration-300 cur"
              />

              <p className="text-red-400 text-sm mt-2">
                {Array.isArray(errorMessage)
                  ? errorMessage.map((msg, index) => (
                      <span key={index}>
                        {msg}
                        <br />
                      </span>
                    ))
                  : errorMessage}
              </p>
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
