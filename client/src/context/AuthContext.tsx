import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, navigate: (path: string) => void) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string, navigate: (path: string) => void) => {
    const payload = { email, password };

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signin", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        const token = data.token;

        // Set the token and user data in localStorage
        axios.defaults.headers.common["Authorization"] = `Bearer ${token.split("|")[1]}`;
        localStorage.setItem("token", token.split("|")[1]);

        // Update authentication state
        setIsAuthenticated(true);
        navigate("/"); // Redirect after successful login
      } else {
        console.error("Failed to log in:", response.statusText);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setIsAuthenticated(false);
        return;
      }

      await axios.delete("http://localhost:8000/api/auth/signout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsAuthenticated(false); // Update authentication state immediately
      console.log("Logged out successfully");
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      if (axios.isAxiosError(error)) {
        console.error("Logout error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
