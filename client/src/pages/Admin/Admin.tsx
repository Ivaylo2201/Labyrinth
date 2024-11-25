import React, { useState } from "react";
import Modal from "react-modal";
import bg2 from "../../assets/bg2.png";
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminUsers from "../../components/AdminUsers/AdminUsers";
import AdminProperties from "../../components/AdminProperties/AdminProperties";
import AdminFeatures from "../../components/AdminFeatures/AdminFeatures";

// const Users = () => (
//   <div>
//     <h1 className="text-2xl font-bold">Users Page</h1>
//   </div>
// );

// const Properties = () => (
//   <div>
//     <h1 className="text-2xl font-bold">Properties Page</h1>
//   </div>
// );

// const Features = () => (
//   <div>
//     <h1 className="text-2xl font-bold">Features Page</h1>
//   </div>
// );

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      setErrorMsg("Invalid username or password");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg2})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>
      <div className="absolute inset-0 flex items-center justify-center w-full">
        {!isLoggedIn && (
          <Modal
            isOpen={!isLoggedIn}
            onRequestClose={() => {}}
            contentLabel="Login Modal"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center outline-none"
            className="p-5 w-96 h-auto backdrop-blur-md bg-[#E0E0E0] bg-opacity-60 rounded-lg flex justify-center outline-none text-center flex-col"
          >
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col items-center gap-6 pb-5 pt-10 w-full"
            >
              <h2 className="text-4xl lg:text-3xl text-center text-gray-800 font-semibold -tracking-tighter">
                Login in Admin Panel
              </h2>
              <input
                type="text"
                name="email"
                value={username}
                onChange={handleChange}
                id="email"
                placeholder="Email"
                className="px-2 py-2 text-md w-full border border-gray-300 rounded"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                id="password"
                placeholder="Password"
                className="px-2 py-2 text-md w-full border border-gray-300 rounded"
              />
              <input
                type="submit"
                value="Login"
                className="text-white px-4 py-2 w-full cursor-pointer border-white border-2 rounded-full text-xl hover:bg-white hover:text-black transition-all duration-300"
              />
              <span className="text-red-700 font-bold text-xl">{errorMsg}</span>
            </form>
          </Modal>
        )}

        {isLoggedIn && (
          <div className="flex h-screen w-full">
            <div className="w-64 bg-gray-800 text-white flex flex-col">
              <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Admin Panel</h2>
              <ul className="flex-grow">
                <li className="p-4 w-full hover:bg-gray-700 cursor-pointer relative group">
                  <Link to="users" className="block w-full">
                    Users
                  </Link>
                </li>
                <li className="p-4 w-full hover:bg-gray-700 cursor-pointer relative group">
                  <Link to="properties" className="block w-full">
                    Properties
                  </Link>
                </li>
                <li className="p-4 w-full hover:bg-gray-700 cursor-pointer relative group">
                  <Link to="features" className="block w-full">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-grow bg-gray-100 text-black p-8">
              <Routes>
                <Route path="users" element={<AdminUsers />} />
                <Route path="properties" element={<AdminProperties />} />
                <Route path="features" element={<AdminFeatures />} />
                <Route index element={<h1 className="text-2xl font-bold">Welcome, Admin!</h1>} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
