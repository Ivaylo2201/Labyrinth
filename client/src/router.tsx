import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

const RouterConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Route for Home page */}
    </Routes>
  );
};

export default RouterConfig;
