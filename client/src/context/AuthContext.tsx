// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   login: (email: string, password: string, navigate: (path: string) => void) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     return !!localStorage.getItem("token");
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   const login = async (email: string, password: string, navigate: (path: string) => void) => {
//     const payload = { email, password };

//     try {
//       const response = await axios.post("http://localhost:8000/api/auth/signin", payload, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200 || response.status === 201) {
//         const data = response.data;
//         const token = data.token;

//         axios.defaults.headers.common["Authorization"] = `Bearer ${token.split("|")[1]}`;
//         localStorage.setItem("token", token.split("|")[1]);

//         setIsAuthenticated(true);
//         navigate("/"); // Навигиране при успех
//       } else {
//         throw new Error(response.statusText); // Хвърля грешка, ако статусът не е успешен
//       }
//     } catch (error: any) {
//       if (axios.isAxiosError(error) && error.response) {
//         const errorMessage = error.response.data?.message || "Login failed. Please try again.";
//         throw new Error(errorMessage); // Хвърляме грешката нагоре
//       } else {
//         throw new Error("An unexpected error occurred. Please try again."); // Генерична грешка
//       }
//     }
//   };

//   const logout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found");
//         setIsAuthenticated(false);
//         return;
//       }

//       await axios.delete("http://localhost:8000/api/auth/signout", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       setIsAuthenticated(false);
//     } catch (error) {
//       setIsAuthenticated(false);
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");

//       if (axios.isAxiosError(error)) {
//         console.error("Logout error:", error.response?.data || error.message);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string, navigate: (path: string) => void) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    phoneNumber: string,
    rePassword: string
  ) => Promise<void>; // New register method
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

        axios.defaults.headers.common["Authorization"] = `Bearer ${token.split("|")[1]}`;
        localStorage.setItem("token", token.split("|")[1]);

        setIsAuthenticated(true);
        navigate("/"); // Navigate on success
      } else {
        throw new Error(response.statusText); // Throw error if status is not successful
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || "Login failed. Please try again.";
        throw new Error(errorMessage); // Throw error upwards
      } else {
        throw new Error("An unexpected error occurred. Please try again."); // Generic error
      }
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string,
    phoneNumber: string,
    rePassword: string
  ) => {
    const payload = {
      email,
      username,
      password,
      password_confirmation: rePassword,
      phone_number: phoneNumber,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup/", payload, {
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
        return data; // return the data if you need to use it
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.errors || "Registration failed. Please try again.");
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
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
