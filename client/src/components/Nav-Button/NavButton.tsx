import React from "react";
import { useNavigate } from "react-router-dom";

interface NavButtonProps {
  name: string; // Display name on the button
  location: string; // URL or path to navigate to
  className?: string; // Optional CSS class for custom styling
  disabled?: boolean; // Optional disabled state for the button
  ariaLabel?: string; // Optional aria-label for accessibility
}

const NavButton: React.FC<NavButtonProps> = ({
  name,
  location,
  className = "",
  disabled = false,
  ariaLabel,
}) => {
  const navigate = useNavigate(); // React Router's hook for programmatic navigation

  const handleClick = () => {
    if (!disabled) {
      navigate(location); // Navigate to the given location when button is clicked
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`nav-button ${className}`}
      disabled={disabled}
      aria-label={ariaLabel || name}
    >
      {name}
    </button>
  );
};

export default NavButton;
