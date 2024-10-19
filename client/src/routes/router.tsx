import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import NoNavLayout from "../layouts/NoNavLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import ForgotPassword from "./../pages/auth/ForgotPassword/ForgotPassword";
import {ProtectedRoute, UserProtectedRoute} from "./ProtectedRoutes";
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
        path="/card"
        element={
          <DefaultLayout>
            <PropertyCard
              id={1}
              status={"rent"}
              type={"house"}
              address={{ city: "varna", street: "varna", country: "Bulgaria" }}
              price={25000}
              bathrooms={2}
              bedrooms={2}
              area={90}
              image={image1}
            />
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
    </Routes>
  );
};

export default RouterConfig;
