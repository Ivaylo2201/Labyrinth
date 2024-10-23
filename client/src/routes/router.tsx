import React from "react";
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
import PropertyCard from "../components/Property-Card/PropertyCard";
import image1 from "../../public/image1.jpg";
import { AddProperty } from "../pages/AddProperty/AddProperty";

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
