import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import NoNavLayout from "../layouts/NoNavLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import ForgotPassword from "./../pages/auth/ForgotPassword/ForgotPassword";
import { ProtectedRoute, UserProtectedRoute } from "./ProtectedRoutes";
import PropertyList from "../pages/PropertyList/PropertyList";
import Property from "../pages/Property/Property";
import { AddProperty } from "../pages/AddProperty/AddProperty";
import { getProfile, getToken } from "../context/AuthContext";
import UserProfile from "../components/UserProfile/UserProfile";
import { User } from "../types/User";
import { ClipLoader } from "react-spinners";
import UpdateProperty from "../pages/UpdateProperty/UpdateProperty";
import { OwnerProtectedRoute } from "./OwnerProtectedRoute";

const RouterConfig: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getProfile(token).then((userData) => setUser(userData));
    }
  }, [getToken]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute
            element={
              <NoNavLayout>
                <Login />
              </NoNavLayout>
            }
          />
        }
      />
      <Route
        path="/properties"
        element={
          <DefaultLayout>
            <PropertyList />
          </DefaultLayout>
        }
      />
      <Route
        path="add-property"
        element={
          <UserProtectedRoute
            element={
              <NoNavLayout>
                <AddProperty />
              </NoNavLayout>
            }
          />
        }
      />

      <Route
        path="/property/:id"
        element={
          <DefaultLayout>
            <Property />
          </DefaultLayout>
        }
      />
      <Route
        path="/property/:id/edit"
        element={
          <OwnerProtectedRoute
            element={
              <DefaultLayout>
                <UpdateProperty />
              </DefaultLayout>
            }
          />
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute
            element={
              <NoNavLayout>
                <Register />
              </NoNavLayout>
            }
          />
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ProtectedRoute
            element={
              <NoNavLayout>
                <ForgotPassword />
              </NoNavLayout>
            }
          />
        }
      />
      <Route
        path="/forgot-password"
        element={
          <ProtectedRoute
            element={
              <NoNavLayout>
                <ForgotPassword />
              </NoNavLayout>
            }
          />
        }
      />
      <Route
        path="/profile"
        element={
          <UserProtectedRoute
            element={
              <NoNavLayout>
                {user ? <UserProfile user={user} /> : <ClipLoader size={200} color="#444444" />}
              </NoNavLayout>
            }
          />
        }
      />

      <Route
        path="/not-found"
        // Extract to separate page
        element={
          <DefaultLayout>
            <div className="text-5xl italic text-zinc-900 font-bold flex flex-col gap-5 justify-center items-center font-Montserrat">
              <p>NOT FOUND</p>
              <p>404</p>
            </div>
          </DefaultLayout>
        }
      />
    </Routes>
  );
};

export default RouterConfig;
