import { Link, useNavigate } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth(); // Extract login from AuthContext

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailAddress(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await login(emailAddress, password, navigate);
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
