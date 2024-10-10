import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import NoNavLayout from "../layouts/NoNavLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import ProtectedRoute from "./ProtectedRoutes";
import PropertyList from "../pages/PropertyList/PropertyList";
import Property from "../pages/Property/Property";

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
    </Routes>
  );
};

export default RouterConfig;
