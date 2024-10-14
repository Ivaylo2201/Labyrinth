import { Link, useNavigate } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import { useState } from "react";
import axios, { AxiosError } from "axios";

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
  let phoneRegex = /^(?:\+359|0)\d{9}$/; // Bulgarian phone number format
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailAddress(value);
      setEmailIsValid(emailRegex.test(value));
    } else if (name === "phone") {
      setPhoneNumber(value);
      setPhoneIsValid(phoneRegex.test(value));
    } else if (name === "password") {
      setPassword(value);
      setPasswordIsValid(passwordRegex.test(value));
      setRePasswordIsValid(rePassword === value);
    } else if (name === "rePassword") {
      setRePassword(value);
      setRePasswordIsValid(value === password);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailIsValid) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!phoneValid) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (!passwordIsValid) {
      setErrorMessage(
        "Password must be at least 8 characters, include 1 lowercase, 1 uppercase, and 1 number."
      );
      return;
    }

    if (!rePasswordIsValid) {
      setErrorMessage("Passwords do not match.");
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

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-min backdrop-blur-md bg-[#E0E0E0] bg-opacity-60 rounded-lg flex justify-center text-center flex-col px-4 py-4">
          <h2 className="text-3xl text-center pb-4 font-['Roboto'] ">Forgot Password</h2>
          <p className="mt-1 mb-2">
            Remember your password?{" "}
            <Link to="/login" className="text-md font-light text-[#551a6e]">
              Login here
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="flex justify-center flex-col items-center">
            <input
              type="text"
              name="email"
              value={emailAddress}
              onChange={onChange}
              id="email"
              placeholder="Email..."
              className={`bg-transparent p-1 w-9/12 text-md font-thin text-black border-b-2 border-black placeholder-black mb-5 focus:outline-none focus:scale-105`}
            />
            <input
              type="text"
              name="phone"
              value={phoneNumber}
              onChange={onChange}
              id="phone"
              placeholder="Phone number..."
              className={`bg-transparent p-1 w-9/12 text-md font-thin text-black border-b-2 border-black placeholder-black mb-5 focus:outline-none focus:scale-105`}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              id="password"
              placeholder="New password..."
              className={`bg-transparent p-1 w-9/12 text-md font-thin text-black border-b-2 border-black placeholder-black mb-5 focus:outline-none focus:scale-105`}
            />
            <input
              type="password"
              name="rePassword"
              value={rePassword}
              onChange={onChange}
              id="rePassword"
              placeholder="Confirm new password..."
              className={`bg-transparent p-1 w-9/12 text-md font-thin text-black border-b-2 border-black placeholder-black mb-5 focus:outline-none focus:scale-105`}
            />
            <p id="errorMsg" className="text-red-500 mb-5">
              {errorMessage}
            </p>
            <input
              type="submit"
              value="Change password"
              className="text-xl font-bold text-white bg-[#212121] rounded-md p-2 hover:bg-[#393939] transition-colors duration-300 cursor-pointer"
            />
          </form>
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
