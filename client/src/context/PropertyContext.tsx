import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { getToken } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../helpers/http";
import { Key } from "lucide-react";

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
  updateProperty: (
    id: number,
    propertyData: UpdatePropertyData,
    setFormValidMsg: (msg: string) => void
  ) => Promise<void>;
  isFormValid: boolean;
  setIsFormValid: (isValid: boolean) => void;
  formValidMsg: string;
  deleteProperty: (id: number) => Promise<void>;
}

interface UpdatePropertyData {
  status: string;
  price: number;
  description: string;
  files?: File[];
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

  const updateProperty = async (
    id: number,
    propertyData: UpdatePropertyData,
    setFormValidMsg: (msg: string) => void
  ) => {
    const propertyDataJson = {
      status: propertyData.status,
      price: propertyData.price,
      description: propertyData.description,
    };

    try {
      const token = getToken();
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/properties/${id}`,
        propertyDataJson,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response);

      if (response.status === 200) {
        console.log("Property updated successfully!");
        setFormValidMsg("Property updated successfully!");
        navigate("/properties");
      }
    } catch (error: any) {
      console.error("Error updating property:", error);
    }
  };

  const handleError = (error: any, setFormValidMsg: (msg: string) => void) => {
    if (axios.isAxiosError(error) && error.response) {
      setFormValidMsg("Error: " + error.response.data.message);
    } else {
      setFormValidMsg("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        createProperty,
        isFormValid,
        setIsFormValid,
        formValidMsg,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyModule = () => {
  const context = useContext(PropertyContext);
  const msg = context?.formValidMsg;
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

export const deleteProperty = async (id: number) => {
  try {
    const token = getToken();

    const response = await Axios.delete(`/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 || response.status === 204) {
      console.log("Property deleted successfully!");
    } else {
      console.error("Error deleting property", response);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Response error:", error.response.data);
    } else {
      console.error("Unexpected error:", error.message);
    }
  }
};

export const usePropertyContext = () => useContext(PropertyContext);
