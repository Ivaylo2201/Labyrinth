import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import NoNavLayout from "../layouts/NoNavLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import ForgotPassword from "./../pages/auth/ForgotPassword/ForgotPassword";
import ProtectedRoute from "./ProtectedRoutes";
import PropertyList from "../pages/PropertyList/PropertyList";

const RouterConfig: React.FC = () => {
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
        path="/property/:id"
        element={
          <DefaultLayout>
            <Property />
          </DefaultLayout>
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
    </Routes>
  );
};

export default RouterConfig;
