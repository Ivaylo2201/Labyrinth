import { Link } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      email: emailAddress,
      password: password,
    };

    console.log("Sending payload:", payload);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signin/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Login Successful:", response.data);
        const data = response.data;
        const token = data.token;

        // Set default Authorization header for future requests
        axios.defaults.headers.common["Authorization"] = token.split("|")[1];
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        console.error("Failed to log in:", response.statusText);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle the specific error, e.g. set error messages
        setErrorMsg(error.response?.data.errors || ["An error occurred."]);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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
          <form onSubmit={handleSubmit} className="flex justify-center flex-col items-center">
            <input
              type="text"
              name="email"
              value={emailAddress}
              onChange={onChange}
              id="email"
              placeholder="Email..."
              style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 border-black placeholder-black mb-5 focus:outline-none -webkit-autofill-bg-transparent focus:scale-105`}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              id="password"
              placeholder="Password..."
              className={`bg-transparent p-1 w-full text-md font-thin text-black border-b-2 border-black placeholder-black mb-5 focus:outline-none focus:scale-105`}
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
