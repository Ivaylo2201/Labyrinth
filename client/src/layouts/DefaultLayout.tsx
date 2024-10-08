import React from "react";
import Navbar from "../components/Navbar/Navbar";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
