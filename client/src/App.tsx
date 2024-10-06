import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./index.css";

import RouterConfig from "./router"; // Import the routes from router.js
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  const location = useLocation(); // Hook to access the current route
  console.log(location.pathname);
  // Paths where the Navbar should NOT be visible
  const noNavRoutes = ["/login", "/register"];
  console.log(noNavRoutes.includes(location.pathname));

  return (
    <div>
      {/* Conditionally render Navbar if the current route is NOT in the noNavRoutes array */}
      {!noNavRoutes.includes(location.pathname) && <Navbar />}
      <RouterConfig /> {/* All route definitions are handled in router.js */}
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
