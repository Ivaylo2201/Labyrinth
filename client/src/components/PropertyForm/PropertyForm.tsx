import { useContext, useState } from "react";
import axios from "axios";
import Dropzone from "../../components/Dropzone/Dropzone";
import Modal from "react-modal";
import { getToken } from "../../context/AuthContext";
import { PropertyProvider, useProperty } from "../../context/PropertyContext";

const PropertyForm: React.FC = () => {
  const { createProperty, isFormValid, formValidMsg } = useProperty();
  const inputStyle = `w-full px-2 py-1 outline-none focus:font-bold focus:text-black bg-gray-300`;
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [area, setArea] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [features, setFeatures] = useState<number[]>([]);
  const [formMsg, setFormMsg] = useState<string>("");

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    const setterMap: Record<string, React.Dispatch<React.SetStateAction<any>>> = {
      type: setType,
      status: setStatus,
    };

    const setter = setterMap[name];
    if (setter) {
      setter(value);
    }
  };

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const setterMap: Record<string, React.Dispatch<React.SetStateAction<any>>> = {
      price: setPrice,
      area: setArea,
      bedrooms: setBedrooms,
      bathrooms: setBathrooms,
      city: setCity,
      street: setStreet,
      country: setCountry,
      description: setDescription,
    };

    const parsedValue = ["price", "area", "bedrooms", "bathrooms"].includes(name)
      ? parseInt(value)
      : value;

    const setter = setterMap[name];
    if (setter) {
      setter(parsedValue);
    }
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createProperty(
      type,
      status,
      price ?? 0,
      area ?? 0,
      bedrooms ?? 0,
      bathrooms ?? 0,
      city,
      street,
      country,
      description,
      files,
      features,
      (msg: string) => setFormMsg(msg)
    );
  };

  const openCloseModal = () => setModalIsOpen(!modalIsOpen);

  const customStyles = {
    content: {
      width: "500px",
      padding: "20px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      background: "white",
      display: "flex",
      flexDirection: "column" as React.CSSProperties["flexDirection"],
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const featureOptions = [
    { id: 1, name: "Refrigerator" },
    { id: 2, name: "Oven and Stove" },
    { id: 3, name: "Dishwasher" },
    { id: 4, name: "Washer and Dryer" },
    { id: 5, name: "Air Conditioning" },
    { id: 6, name: "Heating System" },
    { id: 7, name: "Television" },
    { id: 8, name: "Internet" },
    { id: 9, name: "Balcony" },
    { id: 10, name: "Closets" },
    { id: 11, name: "Swimming Pool" },
    { id: 12, name: "Fireplace" },
    { id: 13, name: "Security System" },
    { id: 14, name: "Parking Space" },
    { id: 15, name: "Landscaping" },
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const featureId = parseInt(e.target.name);
    const { checked } = e.target;
    if (checked) {
      setFeatures([...features, featureId]);
    } else {
      setFeatures(features.filter((id) => id !== featureId));
    }
  };

  return (
    <form className="flex flex-wrap w-full gap-8" id="property-form" onSubmit={handleSubmit}>
      <div className="flex flex-col flex-1 gap-6">
        <select name="type" onChange={onChangeSelect} className={inputStyle}>
          <option value="" disabled selected>
            Choose Property Type
          </option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="office">Office</option>
          <option value="garage">Garage</option>
        </select>

        <input
          type="number"
          name="area"
          value={area ?? ""}
          onChange={onChangeInputs}
          placeholder="Area (sq ft)"
          className={inputStyle}
        />
        <input
          type="number"
          name="price"
          value={price ?? ""}
          onChange={onChangeInputs}
          placeholder="Price"
          className={inputStyle}
        />
        <input
          type="number"
          name="bathrooms"
          value={bathrooms ?? ""}
          onChange={onChangeInputs}
          placeholder="Bathrooms"
          className={inputStyle}
        />
        <input
          type="number"
          name="bedrooms"
          value={bedrooms ?? ""}
          onChange={onChangeInputs}
          placeholder="Bedrooms"
          className={inputStyle}
        />
        <span className="flex flex-col">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 px-1 py-2 text-white duration-200"
            onClick={openCloseModal}
          >
            Add Images
          </button>
          <label>
            {files.length === 0 ? "No images selected" : `${files.length} images selected`}
          </label>
        </span>
      </div>

      <div className="flex flex-col flex-1 gap-6">
        <select name="status" onChange={onChangeSelect} className={inputStyle}>
          <option value="" disabled selected>
            Choose Property Status
          </option>
          <option value="rent">For Rent</option>
          <option value="buy">For Buy</option>
        </select>

        <input
          type="text"
          name="country"
          value={country}
          onChange={onChangeInputs}
          placeholder="Country"
          className={inputStyle}
        />
        <input
          type="text"
          name="city"
          value={city}
          onChange={onChangeInputs}
          placeholder="City"
          className={inputStyle}
        />
        <input
          type="text"
          name="street"
          value={street}
          onChange={onChangeInputs}
          placeholder="Street"
          className={inputStyle}
        />
        <textarea
          name="description"
          value={description}
          onChange={onChangeTextArea}
          placeholder="Property Description"
          className={`${inputStyle} h-24`}
        />
      </div>

      <div className="flex flex-col flex-1 gap-3 bg-gray-300 h-80 p-3 overflow-auto">
        <h3>Select Features</h3>
        {featureOptions.map((feature) => (
          <label key={feature.id} className="flex items-center space-x-1 ">
            <input
              type="checkbox"
              name={String(feature.id)}
              checked={features.includes(feature.id)}
              onChange={handleCheckboxChange}
            />
            <span>{feature.name}</span>
          </label>
        ))}
      </div>

      <div className="flex w-full flex-col justify-center text-center">
        <span className="w-74">
          {!isFormValid && <p className="text-red-500 mb-2">{formMsg}</p>}
          <input
            type="submit"
            value="Add Property"
            className="bg-blue-500 text-white py-3 px-6 w-56 hover:bg-blue-700 duration-200 cursor-pointer rounded-sm "
          />
        </span>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={openCloseModal}
        contentLabel="Add Images Modal"
        style={customStyles}
      >
        <h2>Upload Images</h2>
        <Dropzone onDrop={(acceptedFiles) => setFiles(acceptedFiles)} />
        <button className="bg-green-500 px-3 py-1 rounded-md text-white" onClick={openCloseModal}>
          Done
        </button>
      </Modal>
    </form>
  );
};

export default PropertyForm;
