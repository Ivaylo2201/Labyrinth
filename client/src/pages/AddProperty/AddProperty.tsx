import { useState } from "react";
import bg from "../../assets/bg2.png";
import PropertyForm from "../../components/PropertyForm/PropertyForm";
import { PropertyProvider } from "../../context/PropertyContext";
import { ClipLoader } from "react-spinners";

export const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gray-100 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="pb-5 text-3xl font-bold text-gray-800">Add Property</h1>
        <PropertyProvider>
          <PropertyForm setLoading={setLoading} />
        </PropertyProvider>
      </div>
      {loading && (
        <div className="absolute z-20  w-full h-screen flex justify-center items-center backdrop-blur-sm">
          <ClipLoader size={200} color="#4444" />
        </div>
      )}
    </div>
  );
};
