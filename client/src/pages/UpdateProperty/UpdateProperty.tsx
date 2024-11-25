import { Link, useNavigate, useParams } from "react-router-dom";
import useProperty from "../../hooks/useProperty";
import bg from "../../assets/bg2.png";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Axios } from "../../helpers/http";
import Modal from "react-modal";
import Dropzone from "../../components/Dropzone/Dropzone";
import { Trash2 } from "lucide-react";
import { usePropertyModule } from "../../context/PropertyContext";
import { ClipLoader } from "react-spinners";

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
  const [description, setDescription] = useState("");
  const [oldFiles, setOldFiles] = useState<File[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formMsg, setFormMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const imagesUrl: string = "http://127.0.0.1:8000/storage";

  useEffect(() => {
    if (property) {
      setStatus(property.status || "");
      setPrice(property.price ?? null);
      setDescription(property.description || "");

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
      description: setDescription,
    };

    const parsedValue = ["price"].includes(name) ? parseInt(value) : value;

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

    const propertyData = {
      id: id,
      status,
      price: price ?? 0,
      description,
    };

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

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gray-100 z-0">
      <div className="absolute top-0 left-0 p-2">
        <Link to="properties">Back</Link>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 flex flex-col items-center  justify-center bg-white p-8 rounded-lg shadow-lg lg:max-w-4xl w-full">
        <form
          className="flex flex-col lg:flex-row flex-wrap w-full gap-8 px-8 lg:w-full"
          id="property-form"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-1 gap-6 pt-2 lg:pt-0">
            <h1 className="text-black  text-center text-2xl font-bold ">Update property</h1>
            <select name="status" onChange={onChangeSelect} className={inputStyle} value={status}>
              <option value="" disabled selected>
                Choose Property Status
              </option>
              <option value="rent">For Rent</option>
              <option value="buy">For Buy</option>
            </select>

            <input
              type="number"
              name="price"
              value={price ?? ""}
              onChange={onChangeInputs}
              placeholder="Price"
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

            <textarea
              name="description"
              value={description}
              onChange={onChangeTextArea}
              placeholder="Property Description"
              className={`${inputStyle} h-24`}
            />

            <input
              type="submit"
              value="Update"
              className="bg-blue-500 text-white py-3 px-6  w-full hover:bg-blue-700 duration-200 cursor-pointer rounded-sm "
            />
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
                      newFiles.includes(file)
                        ? URL.createObjectURL(file)
                        : `${imagesUrl}/${file.name}`
                    }
                    className="w-12 h-12"
                    alt={file.name}
                  />
                  <span className="mr-2">{file.name}</span>
                  <span
                    className="cursor-pointer text-red-500"
                    onClick={() => handleFileRemove(file)}
                  >
                    <Trash2 />
                  </span>
                </li>
              ))}
            </ul>
            <Dropzone
              onDrop={(acceptedFiles) => setNewFiles((prev) => [...prev, ...acceptedFiles])}
            />
            <button
              className="bg-green-500 lg:px-3 w-full py-1 rounded-md text-white text-2xl lg:"
              onClick={openCloseModal}
            >
              Done
            </button>
          </Modal>
        </form>
      </div>
      {loading && (
        <div className="absolute z-20  w-full h-screen flex justify-center items-center backdrop-blur-sm">
          <ClipLoader size={200} color="#4444" />
        </div>
      )}
    </div>
  );
}
