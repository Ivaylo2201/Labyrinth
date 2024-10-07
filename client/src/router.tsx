import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";


const RouterConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
};

export default RouterConfig;
