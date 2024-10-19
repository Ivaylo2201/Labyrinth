import React from "react";
import { useNavigate } from "react-router-dom";

interface NavButtonProps {
  name: string; 
  location: string; 
  className?: string; 
  disabled?: boolean; 
  ariaLabel?: string; 
}

const NavButton: React.FC<NavButtonProps> = ({
  name,
  location,
  className = "",
  disabled = false,
  ariaLabel,
}) => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    if (!disabled) {
      navigate(location); 
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`nav-button ${className} font-Montserrat w-28`}
      disabled={disabled}
      aria-label={ariaLabel || name}
    >
      {name}
    </button>
  );
};

export default NavButton;
