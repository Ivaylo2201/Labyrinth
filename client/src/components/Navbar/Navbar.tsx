import NavButton from "../Nav-Button/NavButton";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo-white.png";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [logoutClickCount, setLogoutClickCount] = useState(0); 

  const handleLogout = async () => {
    await logout(); 
    setLogoutClickCount((prevCount) => prevCount + 1); 
  };

  const renderAuthButtons = () => {
    if (logoutClickCount < 2) {
      return (
        <button onClick={handleLogout} className="primary-button">
          Log out
        </button>
      );
    } else {
      return (
        <>
          <NavButton name="Login" location="/login" className="primary-button" />
          <NavButton name="Register" location="/register" className="primary-button" />
        </>
      );
    }
  };

  return (
    <div>
      <nav className="bg-zinc-900 w-full p-3 flex justify-between text-white text-xl">
        {/* Logo and title */}
        <div className="w-2/5 flex direction-col items-center gap-2">
          <img src={logo} alt="logo" className="w-11" />
          <h1 className="text-2xl font-bold">Labyrinth</h1>
        </div>

        <div className="w-2/5 flex items-center gap-10 justify-center">
          <NavButton name="For buy" location="/properties?status=buy" className="primary-button" />
          <NavButton name="For rent" location="/properties?status=rent" className="primary-button" />
          <NavButton name="Contact us" location="/" className="primary-button" />
          <NavButton name="Blogs" location="/" className="primary-button" />
        </div>

        <div className="flex justify-end gap-5 w-2/5 p-2">
          {isAuthenticated ? (
            renderAuthButtons()
          ) : (
            <>
              <NavButton name="Login" location="/login" className="primary-button" />
              <NavButton name="Register" location="/register" className="primary-button" />
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
