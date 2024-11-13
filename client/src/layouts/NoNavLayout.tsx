import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NoNavLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  {
  }
  return (
    <div>
      <header>
        <button
          className=" absolute z-20 top-0 left-0 m-1 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-600 hover:text-white duration-200"
          onClick={goBack}
        >
          Back
        </button>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default NoNavLayout;
