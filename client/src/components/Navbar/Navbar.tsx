import NavButton from "../Nav-Button/NavButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "../../assets/logo-white.png";
const Navbar = () => {
  return (
    <div>
      <nav className="bg-zinc-900 w-full p-1 flex justify-between  text-white text-xl ">
        <div className="w-2/5 flex direction-col items-center gap-2">
          <img src={logo} alt="logo" className="w-11" />
          <h1 className="text-2xl font-bold">Labyrinth</h1>
        </div>
        <div className="w-2/5 flex items-center gap-4 justify-center">
          <NavButton name="For sale" location="/" className="primary-button" />
          <NavButton name="For rent" location="/" className="primary-button" />
          <NavButton name="Contact us" location="/" className="primary-button" />
          <NavButton name="Blogs" location="/" className="primary-button" />
        </div>
        <div className="flex justify-end gap-5 w-2/5 p-2">
          <NavButton name="Login" location="/login" className="primary-button" />
          <NavButton name="Register" location="/register" className="primary-button" />
        </div>
        <ul></ul>
      </nav>
    </div>
  );
};

export default Navbar;
