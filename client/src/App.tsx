import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./index.css";

import RouterConfig from "./router";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  const location = useLocation();
  const noNavRoutes = ["/login", "/register"];

  return (
    <div>
      {}
      {!noNavRoutes.includes(location.pathname) && <Navbar />}
      <RouterConfig />
    </div>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
