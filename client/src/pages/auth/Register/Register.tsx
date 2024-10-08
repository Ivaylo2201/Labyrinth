import { Link, useNavigate } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import { SetStateAction, useState } from "react";
import axios from "axios";

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

  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;
  let phoneNumberRegex = /^(((\+|00)359[- ]?)|(0))(8[- ]?[789]([- ]?\d){7})$/gm;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailAddress(value);
      setEmailIsValid(value ? emailRegex.test(value) : null);
    } else if (name === "username") {
      setUsername(value);
      setUsernameIsValid(value ? value.length > 4 : null);
    } else if (name === "password") {
      setPassword(value);
      setPasswordIsValid(value ? passwordRegex.test(value) : null);
      setRePasswordIsValid(rePassword ? value === rePassword : null);
    } else if (name === "rePassword") {
      setRePassword(value);
      setRePasswordIsValid(value ? value === password : null);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
      setPhoneNumberIsValid(value ? phoneNumberRegex.test(value) : null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setServerMsg("");
    setErrorMsg([]);
    e.preventDefault();
    let msg: SetStateAction<string[]> = [];
    if (!emailIsValid) {
      msg.push("Please enter a valid email address.");
    }
    if (!usernameIsValid) {
      msg.push("\nPlease enter a valid username.");
    }
    if (!passwordIsValid) {
      msg.push(
        "\nPassword must be at least 8 characters, include 1 lowercase, 1 uppercase, and 1 digit."
      );
    }
    if (!rePasswordIsValid) {
      msg.push("\nPasswords do not match.");
    }
    if (!phoneNumberIsValid) {
      msg.push("\nPlease enter a valid phone number.");
    }
    setErrorMsg(msg);
    if (msg.length) {
      return;
    } else {
      setLoading(true);

      const payload = {
        email: emailAddress,
        username: username,
        password: password,
        password_confirmation: rePassword,
        phone_number: phoneNumber,
      };

      console.log("Sending payload:", payload);

      try {
        const response = await axios.post("http://localhost:8000/api/auth/signup/", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 || response.status === 201) {
          console.log("Registration Successful:", response.data);
          const data = response.data;
          const token = data.token;
          axios.defaults.headers.common["Authorization"] = ` Bearer ${token.split("|")[1]}`;
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", token.split("|")[1]);
          setLoading(false);
          navigate("/");
        } else {
          console.error("Failed to register:", response.statusText);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setServerMsg(error.response?.data.errors);
        } else {
          console.error("Unexpected error:", error);
        }
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
        <div className="w-96 h-min backdrop-blur-md bg-[#E0E0E0] bg-opacity-60 p-4 rounded-lg flex justify-center text-center flex-col">
          <h2 className="text-3xl text-center pb-8">Register</h2>
          <form onSubmit={handleSubmit} className="flex justify-center flex-col items-center mb-2">
            <input
              type="text"
              name="email"
              value={emailAddress}
              onChange={onChange}
              id="email"
              placeholder="Email..."
              style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 placeholder-black mb-5 focus:outline-none border-black focus:scale-105`}
            />
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              id="username"
              placeholder="Username.."
              style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 placeholder-black mb-5 focus:outline-none border-black focus:scale-105`}
            />
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
              id="phoneNumber"
              placeholder="Phone number..."
              style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 placeholder-black mb-5 focus:outline-none border-black focus:scale-105`}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              id="password"
              placeholder="Password..."
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 placeholder-black mb-5 focus:outline-none border-black focus:scale-105`}
            />
            <input
              type="password"
              name="rePassword"
              value={rePassword}
              onChange={onChange}
              id="rePassword"
              placeholder="Confirm password..."
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 placeholder-black mb-5 focus:outline-none border-black focus:scale-105`}
            />

            <input
              type="submit"
              value="Sign up"
              className="text-xl mt-5 font-bold text-white bg-[#212121] rounded-md p-2 w-44 hover:bg-[#393939] transition-colors duration-300 cursor-pointer "
            />
          </form>
          <p className="text-red-600 text-sm">
            {Array.isArray(errorMsg)
              ? errorMsg.map((msg, index) => (
                  <span key={index}>
                    {msg}
                    <br />
                  </span>
                ))
              : errorMsg}
          </p>
          {Object.entries(serverMsg).map(([field, messages]) => (
            <p className="text-red-600" key={field}>
              {Array.isArray(messages) ? messages.join(", ") : messages}
            </p>
          ))}
          <p className="text-md mt-3 font-light ">
            Already have an account?{" "}
            <Link to="/login" className="text-[#551a6e]">
              Sign in
            </Link>
          </p>
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
