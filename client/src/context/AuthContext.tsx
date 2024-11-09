import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Axios } from "../helpers/http";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, navigate: (path: string) => void) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    phoneNumber: string,
    rePassword: string,
    role_id: number
  ) => Promise<void>;
  getToken: () => string | null;
  getUserEmail: () => Promise<any>;
}
export const getToken = () => {
  return localStorage.getItem("token");
};

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
      const response = await Axios.post("/auth/signin", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        const token = data.token;

        axios.defaults.headers.common["Authorization"] = `Bearer ${token.split("|")[1]}`;
        localStorage.setItem("token", token.split("|")[1]);

        setIsAuthenticated(true);
        navigate("/");
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || "Login failed. Please try again.";
        throw new Error(errorMessage);
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string,
    phoneNumber: string,
    rePassword: string,
    role_id: number
  ) => {
    const payload = {
      email,
      username,
      password,
      password_confirmation: rePassword,
      phone_number: phoneNumber,
      role_id,
    };

    try {
      const response = await Axios.post("/auth/signup/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        const token = data.token;

        axios.defaults.headers.common["Authorization"] = `Bearer ${token.split("|")[1]}`;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", token.split("|")[1]);
        setIsAuthenticated(true);
        return data;
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errors = error.response.data.errors;
        throw errors;
      } else {
        throw new Error("An unknown error occurred.");
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

      await Axios.delete("/auth/signout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
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
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, register, getToken, getUserEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const getUserEmail: () => Promise<string | null> = async () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
  const response = await Axios.get("http://127.0.0.1:8000/api/profile/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const getProfile = async (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await Axios.get("http://127.0.0.1:8000/api/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
