import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import RouterConfig from "./router"; // Import the routes from router.js
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar with navigation buttons */}
        <RouterConfig /> {/* All route definitions are handled in router.js */}
      </div>
    </Router>
  );
};

export default App;
