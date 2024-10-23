import { Mail, MapPin, PhoneCall, UserRound } from "lucide-react";
import { User } from "../../types/User";
import bg from "../../assets/bg2.png";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { Axios } from "../../helpers/http";
import axios, { AxiosError } from "axios";

type UserProfileProps = {
  user: User;
};

function UserProfile({ user }: UserProfileProps) {
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successfully, setSuccessfully] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(password && repeatPassword)) {
      setErrorMessage("Please enter passwords!  ");
      return;
    }
    if (password != repeatPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      setLoading(true);
      const response = await Axios.patch("/auth/reset", {
        email: user.email,
        phone_number: user.phone_number,
        password: password,
        password_confirmation: repeatPassword,
      });

      if (response.status === 200) {
        setErrorMessage("Password successfully changed.");
        setSuccessfully(true);
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
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="flex flex-col gap-2 z-10 bg-white  rounded-lg px-4 py-2 shadow-white j">
        <span className="flex flex-row justify-between">
          <h1 className="text-xl font-bold pb-4">Profile information</h1>
        </span>
        <span className="flex flex-row justify-between">
          <span className="flex gap-2 flex-col justify-center pr-9">
            <div className="flex gap-2 justify-start items-center ">
              <UserRound size={25} />
              <p>{user.username}</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <PhoneCall size={23} />
              <p>{user.phone_number}</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <Mail size={23} />
              <p>{user.email}</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <MapPin size={23} />
              <p>{user.location == "Unknown" ? "N/A" : user.location}</p>
            </div>
          </span>
          <span className="flex flex-col gap-2 border-l-2 border-black pl-4">
            <h3 className="font-semibold text-start">Change password</h3>
            <form action="" className="flex flex-col gap-2" onSubmit={changePassword}>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handlePasswordChange}
                value={password}
                className="bg-white outline-none px-2 py-1 border-gray-500 border-2 rounded-md placeholder-black text-md "
                placeholder="New password"
              />
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                onChange={handleRepeatPasswordChange}
                value={repeatPassword}
                placeholder="Repeat password"
                className="bg-white outline-none px-2 py-1 border-gray-500 border-2 rounded-md placeholder-black text-md "
              />
              <input
                type="submit"
                value="Change password"
                className="bg-blue-600 outline-none border-none px-2 py-1 text-white text-md hover:bg-blue-800 duration-150 rounded-md"
              />
              <p
                className={`text-sm text-center ${
                  successfully ? "text-green-500" : "text-red-500"
                }`}
              >
                {errorMessage}
              </p>
            </form>
          </span>
        </span>
      </div>
    </div>
  );
}

export default UserProfile;
