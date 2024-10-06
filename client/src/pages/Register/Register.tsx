import { Link } from "react-router-dom";
import bg2 from "../../assets/bg2.png";
import { useState } from "react";

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState<null | boolean>(null);
  const [usernameIsValid, setUsernameIsValid] = useState<null | boolean>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<null | boolean>(null);
  const [rePasswordIsValid, setRePasswordIsValid] = useState<null | boolean>(null);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState<null | boolean>(null);

  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;
  let phoneNumberRegex = /^(((\+|00)359[- ]?)|(0))(8[- ]?[789]([- ]?\d){7})$/gm;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailAddress(value);
      setEmailIsValid(value ? emailRegex.test(value) : null); // Validate email
    } else if (name === "username") {
      setUsername(value);
      setUsernameIsValid(value ? value.length > 4 : null);
    } else if (name === "password") {
      setPassword(value);
      setPasswordIsValid(value ? passwordRegex.test(value) : null); // Validate password
      setRePasswordIsValid(rePassword ? value === rePassword : null); // Check rePassword validation
    } else if (name === "rePassword") {
      setRePassword(value);
      setRePasswordIsValid(value ? value === password : null); // Check rePassword validity
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
      setPhoneNumberIsValid(value ? phoneNumberRegex.test(value) : null); // Check rePassword validity
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      emailIsValid &&
      usernameIsValid &&
      passwordIsValid &&
      rePasswordIsValid &&
      phoneNumberIsValid
    ) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/auth/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailAddress,
            username: username,
            password: password,
            phone_number: phoneNumber,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Registration Successful:", data);
          // You can handle success (e.g., navigate to login page, show success message)
        } else {
          console.error("Failed to register:", response.statusText);
          // You can handle failure (e.g., show error message)
        }
      } catch (error) {
        console.error("Error occurred during registration:", error);
        // Handle network or other errors
      }
    } else {
      console.error("Validation failed. Please fill all fields correctly.");
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

  const rePasswordBorderColor =
    rePasswordIsValid === null
      ? "border-black" // Empty state
      : rePasswordIsValid
      ? "border-green-500" // Valid state
      : "border-red-500"; // Invalid state

  const usernameBorderColor =
    usernameIsValid === null
      ? "border-black" // Empty state
      : usernameIsValid
      ? "border-green-500" // Valid state
      : "border-red-500"; // Invalid state

  const phoneNumberBorderColor =
    phoneNumberIsValid === null
      ? "border-black" // Empty state
      : phoneNumberIsValid
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
        <div className="w-72 h-min backdrop-blur-md bg-[#E0E0E0] bg-opacity-60 p-4 rounded-lg flex justify-center text-center flex-col">
          <h2 className="text-3xl text-center pb-8">Register</h2>
          <form
            action="http://127.0.0.1:8000/api/auth/signup/"
            onSubmit={handleSubmit}
            className="flex justify-center flex-col items-center"
          >
            <input
              type="text"
              name="email"
              value={emailAddress}
              onChange={onChange}
              id="email"
              placeholder="Email..."
              style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 ${emailBorderColor} placeholder-black mb-5 focus:outline-none`}
            />
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              id="username"
              placeholder="Username.."
              style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 ${usernameBorderColor} placeholder-black mb-5 focus:outline-none`}
            />
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
              id="phoneNumber"
              placeholder="Phone number..."
              style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 ${phoneNumberBorderColor} placeholder-black mb-5 focus:outline-none`}
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
              type="password"
              name="rePassword"
              value={rePassword}
              onChange={onChange}
              id="rePassword"
              placeholder="Confirm password..."
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 ${rePasswordBorderColor} placeholder-black mb-5 focus:outline-none `}
            />
            <input
              type="submit"
              value="Sign up"
              className="text-xl font-bold text-white bg-[#212121] rounded-md p-2 w-44 hover:bg-[#393939] transition-colors duration-300 cursor-pointer"
            />
          </form>
          <p className="text-md mt-3 font-light ">
            Already have an account?{" "}
            <Link to="/login" className="text-[#551a6e]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
