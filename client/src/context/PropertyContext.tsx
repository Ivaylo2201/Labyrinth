import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { getToken } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface PropertyContextType {
  createProperty: (
    type: string,
    status: string,
    price: number,
    area: number,
    bedrooms: number,
    bathrooms: number,
    city: string,
    street: string,
    country: string,
    description: string,
    files: File[],
    features: number[],

    setFormValidMsg: (msg: string) => void
  ) => Promise<void>;
  isFormValid: boolean;
  setIsFormValid: (isValid: boolean) => void;
  formValidMsg: string;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [formValidMsg, setFormValidMsg] = useState<string>("");
  const navigate = useNavigate();

  const createProperty = async (
    type: string,
    status: string,
    price: number,
    area: number,
    bedrooms: number,
    bathrooms: number,
    city: string,
    street: string,
    country: string,
    description: string,
    files: File[],
    features: number[],
    setFormValidMsg: (msg: string) => void
  ) => {
    const formData = new FormData();

    try {
      const fields = {
        type,
        status,
        price,
        area,
        bedrooms,
        bathrooms,
        city,
        street,
        country,
        description,
        files,
        features,
      };

      const isValid = Object.values(fields).every(
        (value) => value !== "" && value !== undefined && value !== null
      );

      if (!isValid || files.length === 0) {
        setFormValidMsg("All fields are required and at least one image must be uploaded.");
        setIsFormValid(false);
        return;
      }
      setIsFormValid(true);
      files.forEach((file) => formData.append("images[]", file));

      [
        { key: "type", value: type },
        { key: "status", value: status },
        { key: "price", value: price?.toString() ?? "" },
        { key: "area", value: area?.toString() ?? "" },
        { key: "bedrooms", value: bedrooms?.toString() ?? "" },
        { key: "bathrooms", value: bathrooms?.toString() ?? "" },
        { key: "city", value: city },
        { key: "street", value: street },
        { key: "country", value: country },
        { key: "description", value: description },
      ].forEach(({ key, value }) => formData.append(key, String(value)));

      features.forEach((featureId) => formData.append("features[]", featureId.toString()));

      const token = getToken();

      const response = await axios.post("http://127.0.0.1:8000/api/properties/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setFormValidMsg("Property created successfully!");
        setIsFormValid(true);
        navigate("/properties");
      } else {
        console.error("Error creating property", response);
        setFormValidMsg("Failed to create property.");
        setIsFormValid(false);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Response error:", error.response.data);
        setFormValidMsg("Error: " + error.response.data.message);
      } else {
        console.error("Unexpected error:", error.message);
        setFormValidMsg("An unexpected error occurred. Please try again.");
      }
      setIsFormValid(false);
    }
  };

  return (
    <PropertyContext.Provider value={{ createProperty, isFormValid, setIsFormValid, formValidMsg }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  const msg = context?.formValidMsg;
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};
