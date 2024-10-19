import { useState } from "react";
import bg from "../../assets/bg2.png";
import axios from "axios";
import Dropzone from "../../components/Dropzone/Dropzone";
export const AddProperty = () => {
  const inputStyle = `w-full px-2 py-1 outline-none`;
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [area, setArea] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");

  const [features, setFeatures] = useState<string[]>([]);

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...event.target.files]);
    }
  };

  const [description, setDescription] = useState("");
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "type") {
      setType(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "") {
      e.target.classList.add("shadow-red-500", "shadow-md");
    } else {
      e.target.classList.remove("shadow-red-500", "shadow-sm");
    }

    if (name === "price") {
      setPrice(parseInt(value));
    } else if (name === "area") {
      setArea(parseInt(value));
    } else if (name === "bedrooms") {
      setBedrooms(parseInt(value));
    } else if (name === "bathrooms") {
      setBathrooms(parseInt(value));
    } else if (name === "city") {
      setCity(value);
    } else if (name === "street") {
      setStreet(value);
    } else if (name === "country") {
      setCountry(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value === "") {
      e.target.classList.add("shadow-red-500", "shadow-md");
    } else {
      e.target.classList.remove("shadow-red-500", "shadow-sm");
    }
    setDescription(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

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
    };

    Object.keys(fields).forEach((key) => {
      const field = fields[key as keyof typeof fields];
      const element = form.elements.namedItem(key) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;

      if (element) {
        if (!field) {
          element.classList.add("shadow-red-500", "shadow-md");
        } else {
          element.classList.remove("shadow-red-500", "shadow-md");
        }
      }
    });

    // Check if all fields are filled
    const isFormValid = Object.values(fields).every(
      (value) => value !== "" && value !== undefined && value !== null
    );

    if (!isFormValid) {
      console.error("Please fill in all fields");
      return;
    }

    const formData: FormData = new FormData();

    // files.map((file) => formData.append("images[]", file));
    files.forEach((file) => {
      console.log(file);

      formData.append("images[]", file); // Променено е на "images", вместо "images[]"
    });
    formData.append("type", type);
    formData.append("status", status);
    formData.append("price", String(price));
    formData.append("area", String(area));
    formData.append("bedrooms", String(bedrooms));
    formData.append("bathrooms", String(bathrooms));
    formData.append("city", city);
    formData.append("street", street);
    formData.append("country", country);
    formData.append("description", description);
    console.log(files);

    let featuresList = ["tv", "wifi", "kitchen"];
    setFeatures(featuresList);
    formData.append("features[]", JSON.stringify(features));
    const token = localStorage.getItem("token");
    axios
      .post("http://127.0.0.1:8000/api/properties/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
      <div className="relative z-10   flex flex-col items-center justify-center bg-gray-400 p-10  rounded-lg">
        <h1 className="pb-8 text-2xl">Add Property</h1>
        <form
          action=""
          className="flex flex-wrap w-full flex-row gap-10 dropzone"
          id="my-dropzone"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col flex-1 w-full gap-5">
            <select name="type" id="type" className={inputStyle} onChange={onChangeSelect}>
              <option value="" selected>
                Choose a type
              </option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
              <option value="garage">Garage</option>
            </select>
            <select name="status" id="status" className={inputStyle} onChange={onChangeSelect}>
              <option value="" selected>
                Choose a status
              </option>
              <option value="rent">For Rent</option>
              <option value="buy">For Buy</option>
            </select>
            <input
              type="number"
              name="price"
              id="price"
              onChange={onChangeInputs}
              value={price ?? undefined}
              placeholder="Price"
              className={inputStyle}
            />
            <input
              type="number"
              name="bathrooms"
              id="bathrooms"
              onChange={onChangeInputs}
              value={bathrooms ?? undefined}
              min={0}
              placeholder="Bathrooms"
              className={inputStyle}
            />

            <input
              type="number"
              name="bedrooms"
              id="bedrooms"
              value={bedrooms ?? undefined}
              onChange={onChangeInputs}
              min={0}
              placeholder="Bedrooms"
              className={inputStyle}
            />
            <span>
              <label htmlFor="images">Images:</label>
              <Dropzone onDrop={(acceptedFiles) => setFiles(acceptedFiles)} />
            </span>
          </div>
          <div className="flex flex-col flex-1 w-full gap-5">
            <input
              type="number"
              name="area"
              id="area"
              onChange={onChangeInputs}
              value={area ?? undefined}
              min={0}
              placeholder="Area"
              className={inputStyle}
            />
            <input
              type="text"
              name="country"
              id="country"
              onChange={onChangeInputs}
              value={country}
              placeholder="Country"
              className={inputStyle}
            />
            <input
              type="text"
              name="city"
              id="city"
              onChange={onChangeInputs}
              placeholder="City"
              className={inputStyle}
              value={city}
            />
            <input
              type="text"
              name="street"
              id="street"
              onChange={onChangeInputs}
              value={street}
              placeholder="Street"
              className={inputStyle}
            />
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              className={` ${inputStyle} resize-none w-full `}
              onChange={onChangeTextArea}
              value={description}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};
