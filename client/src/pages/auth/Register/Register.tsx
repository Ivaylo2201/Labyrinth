import { Link, useNavigate } from "react-router-dom";
import bg2 from "../../../assets/bg2.png";
import bgForm from "../../../assets/signImage.jpg";
import logo from "../../../assets/logo.png";

import { SetStateAction, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const { register } = useAuth();
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState("");

  const [emailIsValid, setEmailIsValid] = useState<null | boolean>(null);
  const [usernameIsValid, setUsernameIsValid] = useState<null | boolean>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<null | boolean>(null);
  const [rePasswordIsValid, setRePasswordIsValid] = useState<null | boolean>(null);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState<null | boolean>(null);
  const [roleIsValid, setRoleIsValid] = useState<null | boolean>(null);

  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;
  let phoneNumberRegex = /^(((\+|00)359[- ]?)|(0))(8[- ]?[789]([- ]?\d){7})$/gm;

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (value) {
      setRole(value);
    } else {
      setRole("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setServerMsg("");
    setErrorMsg([]);
    e.preventDefault();
    let msg: SetStateAction<string[]> = [];
    if (!emailIsValid) {
      setEmailIsValid(false);
    }
    if (!usernameIsValid) {
      setUsernameIsValid(false);
    }
    if (!passwordIsValid) {
      setPasswordIsValid(false);
    }
    if (!rePasswordIsValid) {
      setRePasswordIsValid(false);
    }
    if (!phoneNumberIsValid) {
      setPhoneNumberIsValid(false);
    }
    if (role === "") {
      setRoleIsValid(false);
    } else {
      setRoleIsValid(true);
    }
    if (
      !(
        emailIsValid &&
        passwordIsValid &&
        usernameIsValid &&
        rePasswordIsValid &&
        phoneNumberIsValid &&
        roleIsValid
      )
    ) {
      // msg.push("Please enter valid data!");
      return;
    }
    setErrorMsg(msg);
    if (msg.length) {
      return;
    } else {
      setLoading(true);

      try {
        await register(emailAddress, username, password, phoneNumber, rePassword, role);
        setLoading(false);
        navigate("/");
      } catch (error: any) {
        setServerMsg(error.message);
        setLoading(false);
      }
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
        <div className="w-3/5  h-2/4 backdrop-blur-md bg-[#E0E0E0]  bg-opacity-60 rounded-lg flex justify-center text-center flex-row">
          <div className="w-1/2  bg-white flex flex-col items-center">
            <h1 className="text-2xl font-semibold uppercase tracking-wide pt-10 pb-2">Welcome</h1>
            <img src={logo} alt="logo" className="w-36 h-36" />
            <p className="pb-10">Already have an account? </p>
            <Link
              to="/login"
              className="text-md  font-semibold text-black border-black  border-2
            px-2 rounded-full hover:text-white hover:bg-black transition-all duration-300"
            >
              Sign in
            </Link>
          </div>
          <div
            className="w-1/2 relative inset-0 bg-cover bg-center p-4"
            style={{ backgroundImage: `url(${bgForm})` }}
          >
            <h2 className="text-3xl text-center pt-1 pb-2 text-white font-semibold -tracking-tighter ">
              Register
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col items-center gap-2 pt-4"
            >
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChangeInputs}
                id="username"
                placeholder="Username"
                className={`px-2 py-1 text-sm w-full ${
                  usernameIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${usernameIsValid === null || usernameIsValid === true ? "" : ""}`}
              />

              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangeInputs}
                id="phoneNumber"
                placeholder="Phone number"
                className={`px-2 py-1 text-sm w-full ${
                  phoneNumberIsValid === false ? "shadow-red-500 shadow-xl " : ""
                } ${phoneNumberIsValid === null || phoneNumberIsValid === true ? "" : ""}`}
              />

              <input
                type="text"
                name="email"
                value={emailAddress}
                onChange={onChangeInputs}
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
                onChange={onChangeInputs}
                id="password"
                placeholder="Password"
                className={`px-2 py-1 text-sm w-full ${
                  passwordIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${passwordIsValid === null || passwordIsValid === true ? "" : ""}`}
              />

              <input
                type="password"
                name="rePassword"
                value={rePassword}
                onChange={onChangeInputs}
                id="rePassword"
                placeholder="Confirm password"
                className={`px-2 py-1 text-sm w-full ${
                  rePasswordIsValid === false ? "shadow-red-500 shadow-xl" : ""
                } ${rePasswordIsValid === null || rePasswordIsValid === true ? "" : ""}`}
              />

              <select
                name="role"
                id=""
                className={`px-2 py-1 text-sm w-full ${
                  roleIsValid === false ? " shadow-red-500 shadow-xl" : ""
                } ${roleIsValid === null || roleIsValid === true ? "" : ""}`}
                onChange={onSelectChange}
              >
                <option value="" selected>
                  Choose a role
                </option>
                <option value="company">Company</option>
                <option value="user">User</option>
              </select>
              <span>
                <input
                  type="submit"
                  value="Register"
                  className="text-white px-4 border-white border-2 rounded-full  hover:bg-white hover:text-black transition-all duration-300"
                />

                {/* <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong class="font-bold">Holy smokes!</strong>
                  <span class="block sm:inline">Something seriously bad happened.</span>
                  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div> */}

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
                {serverMsg && <p className="text-red-400 text-sm">{serverMsg}</p>}
              </span>
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
