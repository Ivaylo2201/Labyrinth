import { Link } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import { useState } from "react";

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
      const response = await fetch("/api/check-email-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailAddress, phone: phoneNumber }),
      });

      const data = await response.json();

      if (data.exists) {
        setErrorMessage("Email or phone number already exists.");
      } else {
        console.log("User is valid, proceed with registration.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
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
        <div className="w-96 h-min backdrop-blur-md bg-[#E0E0E0] bg-opacity-60 rounded-lg flex justify-center text-center flex-col px-4 py-4">
          <h2 className="text-3xl text-center pb-8 font-['Roboto'] ">Forgot Password</h2>
          <p className="mt-4">
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
              className={`bg-transparent p-1 w-9/12 text-md font-thin text-black border-b-2 ${
                emailIsValid === null
                  ? "border-black"
                  : emailIsValid
                  ? "border-green-500"
                  : "border-red-500"
              } placeholder-black mb-5 focus:outline-none`}
            />
            <input
              type="text"
              name="phone"
              value={phoneNumber}
              onChange={onChange}
              id="phone"
              placeholder="Phone number..."
              className={`bg-transparent p-1 w-9/12 text-md font-thin text-black border-b-2 ${
                phoneValid === null
                  ? "border-black"
                  : phoneValid
                  ? "border-green-500"
                  : "border-red-500"
              } placeholder-black mb-5 focus:outline-none`}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              id="password"
              placeholder="Password..."
              className={`bg-transparent p-1 w-9/12 text-md font-thin text-black border-b-2 ${
                passwordIsValid === null
                  ? "border-black"
                  : passwordIsValid
                  ? "border-green-500"
                  : "border-red-500"
              } placeholder-black mb-5 focus:outline-none`}
            />
            <input
              type="password"
              name="rePassword"
              value={rePassword}
              onChange={onChange}
              id="rePassword"
              placeholder="Confirm password..."
              className={`bg-transparent p-1 w-9/12 text-md font-thin text-black border-b-2 ${
                rePasswordIsValid === null
                  ? "border-black"
                  : rePasswordIsValid
                  ? "border-green-500"
                  : "border-red-500"
              } placeholder-black mb-5 focus:outline-none`}
            />
            <p id="errorMsg" className="text-red-500 mb-5">
              {errorMessage}
            </p>
            <input
              type="submit"
              value="Register"
              className="text-xl font-bold text-white bg-[#212121] rounded-md p-2 hover:bg-[#393939] transition-colors duration-300 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
