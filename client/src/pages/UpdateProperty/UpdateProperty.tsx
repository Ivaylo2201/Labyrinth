import { Link, useNavigate, useParams } from "react-router-dom";
import useProperty from "../../hooks/useProperty";

// import ClipLoader from "react-spinners/ClipLoader";
import { getToken, useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Axios } from "../../helpers/http";
import Modal from "react-modal";
import Dropzone from "../../components/Dropzone/Dropzone";
import { Trash2 } from "lucide-react";
import { usePropertyModule } from "../../context/PropertyContext";

export default function UpdateProperty() {
  const { id } = useParams();
  const { updateProperty } = usePropertyModule();
  const navigate = useNavigate();
  const url = `/properties/${id}`;
  const auth = useAuth();
  const { data: property, isError } = useProperty(url);
  const inputStyle = `w-full px-3 py-2 lg:px-2 lg:py-1 outline-none focus:font-bold focus:text-black bg-gray-300`;
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
  const [oldFiles, setOldFiles] = useState<File[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [features, setFeatures] = useState<number[]>([]);
  const [formMsg, setFormMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const imagesUrl: string = "http://127.0.0.1:8000/storage";
  const [featureOptions, setFeatureOptions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await Axios.get("/features");
        setFeatureOptions(response.data);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  useEffect(() => {
    if (property) {
      setType(property.type || "");
      setStatus(property.status || "");
      setPrice(property.price ?? null);
      setArea(property.area ?? null);
      setBedrooms(property.bedrooms ?? null);
      setBathrooms(property.bathrooms ?? null);
      setCity(property.address.city || "");
      setStreet(property.address.street || "");
      setCountry(property.address.country || "");
      setDescription(property.description || "");
      const featureNames = property.features || [];
      const selectedFeatureIds = featureOptions
        .filter((feature) => featureNames.includes(feature.name))
        .map((feature) => feature.id);

      setFeatures(selectedFeatureIds);

      const existingFiles = property.images.map((image) => new File([], image));
      setOldFiles(existingFiles);
    }
  }, [property]);

  useEffect(() => {
    setFiles([...oldFiles, ...newFiles]);
  }, [oldFiles, newFiles]);

  const handleFileRemove = (file: File) => {
    setOldFiles((prev) => prev.filter((f) => f !== file));
    setNewFiles((prev) => prev.filter((f) => f !== file));
  };

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
    setLoading(true);

    // Construct propertyData object to match the structure expected by updateProperty
    const propertyData = {
      type,
      status,
      price: price ?? 0,
      area: area ?? 0,
      bedrooms: bedrooms ?? 0,
      bathrooms: bathrooms ?? 0,
      city,
      street,
      country,
      description,
      files,
      features,
    };
    console.log();

    await updateProperty(Number(id), propertyData, (msg: string) => {
      setFormMsg(msg);
    });
    setLoading(false);
  };

  const openCloseModal = () => setModalIsOpen(!modalIsOpen);

  const customStyles = {
    content: {
      width: "700px",
      height: "auto",
      padding: "40px 20px",
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
      backdropFilter: "blur(3px)",
    },
  };
  const onFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const featureId = parseInt(e.target.name);
    setFeatures((prevFeatures) => {
      if (e.target.checked) {
        return [...prevFeatures, featureId];
      } else {
        return prevFeatures.filter((id) => id !== featureId);
      }
    });
  };
  return (
    <form
      className="flex flex-col lg:flex-row flex-wrap w-full gap-8 p-16"
      id="property-form"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col lg:flex-1 gap-6 pt-12 lg:pt-0">
        <h1 className="text-black pt-36 text-center text-2xl font-bold lg:hidden">Add property</h1>
        <select name="type" onChange={onChangeSelect} className={inputStyle} value={type}>
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
        <select name="status" onChange={onChangeSelect} className={inputStyle} value={status}>
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

      <div className="flex flex-col flex-1 gap-3 bg-gray-300  lg:h-80 p-3 lg:overflow-auto">
        <h3>Select Features</h3>
        {featureOptions.map((feature) => (
          <label key={feature.id} className="flex items-center space-x-1">
            <input
              type="checkbox"
              name={String(feature.id)}
              checked={features.includes(feature.id)}
              onChange={onFeatureChange}
            />
            <span>{feature.name}</span>
          </label>
        ))}
      </div>

      <div className="flex w-full flex-col justify-center text-center">
        <span className="w-74">
          {/* {!isFormValid && <p className="text-red-500 mb-2">{formMsg}</p>} */}
          <input
            type="submit"
            value="Update"
            className="bg-blue-500 text-white py-3 px-6 lg:w-56 w-full hover:bg-blue-700 duration-200 cursor-pointer rounded-sm "
          />
        </span>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={openCloseModal}
        contentLabel="Add Images Modal"
        style={customStyles}
      >
        <h2>Upload Images</h2>(
        {files.length === 0 ? "No images selected" : `${files.length} images selected`})
        <ul className="list-disc pl-4 overflow-auto w-full">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between">
              <img
                src={
                  newFiles.includes(file) ? URL.createObjectURL(file) : `${imagesUrl}/${file.name}`
                }
                className="w-12 h-12"
                alt={file.name}
              />
              <span className="mr-2">{file.name}</span>
              <span className="cursor-pointer text-red-500" onClick={() => handleFileRemove(file)}>
                <Trash2 />
              </span>
            </li>
          ))}
        </ul>
        <Dropzone onDrop={(acceptedFiles) => setNewFiles((prev) => [...prev, ...acceptedFiles])} />
        <button
          className="bg-green-500 lg:px-3 w-full py-1 rounded-md text-white text-2xl lg:"
          onClick={openCloseModal}
        >
          Done
        </button>
      </Modal>
    </form>
  );
}
