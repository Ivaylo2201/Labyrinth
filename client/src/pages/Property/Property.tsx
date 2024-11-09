import { Link, useNavigate, useParams } from "react-router-dom";
import useProperty from "../../hooks/useProperty";
import ClipLoader from "react-spinners/ClipLoader";
import ImageSlider from "../../components/Slider/Slider";
import formatThousands from "../../helpers/formatThousands";
import { capitalize } from "../../helpers/capitalize";
import { getDate } from "../../helpers/getDate";
import Description from "../../components/Description/Description";
import FeatureList from "../../components/Features-List/FeaturesList";
import PropertyUserProfile from "../../components/PropertyUserProfile/PropertyUserProfile";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Modal from "react-modal";
import { deleteProperty } from "../../context/PropertyContext";


Modal.setAppElement("#root");

function Property() {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `/properties/${id}`;
  const auth = useAuth();
  const { data: property, isError } = useProperty(url);

  const [isOwner, setIsOwner] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        if (property) {
          const userData = await auth.getUserEmail();
          const userEmail = userData?.email;

          const isUserObject = typeof property.user === "object" && "email" in property.user;
          setIsOwner(isUserObject && userEmail === property.user.email);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };
    fetchUserEmail();
  }, [property, auth]);

  const handleDeleteClick = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const confirmDelete = async () => {
    await deleteProperty(parseInt(id as string));
    navigate("/properties");
    setShowDeleteModal(false);
  };

  if (isError) {
    navigate("/not-found");
    return null;
  }

  if (property === undefined) {
    return <ClipLoader size={50} color={"#333333"} />;
  }

  const isForRent = property.status === "rent";
  const customStyles = {
    content: {
      width: "500px",
      height: "200px",
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
      backdropFilter: "blur(3px)",
    },
  };
  return (
    <div className="flex flex-grow items-center flex-col z-0">
      <div className="p-4 gap-10 flex flex-col lg:flex-row">
        <ImageSlider images={property.images} />
        <div className="p-4 gap-3 flex items-center flex-col font-Montserrat text-charcoal">
          <span className="flex flex-row justify-between w-full">
            <p className="text-[#a8a8a8] italic self-start">Property id: {id}</p>
            {isOwner && (
              <span className="flex flex-row gap-4">
                <Link to={`/property/${id}/edit`}>
                  <Pencil size={30} />
                </Link>
                <button onClick={handleDeleteClick}>
                  <Trash2 size={30} />
                </button>
              </span>
            )}
          </span>
          <p className="text-4xl font-bold">
            {capitalize(property.type)} in {property.address.country}
          </p>
          <p className="text-xl">
            {property.address.city}, {property.address.street}
          </p>
          <p className="font-bold text-xl">
            {formatThousands(property.price)}€{isForRent ? " / Month" : ""}
          </p>
          <Description text={property.description} />
          <p className="font-bold">Posted on: {getDate(property.created_at)}</p>
          <PropertyUserProfile user={property.user} />
        </div>
      </div>

      <FeatureList features={property.features} />

      <Modal
        isOpen={showDeleteModal}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Confirm Delete"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this property?</p>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={closeDeleteModal} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Property;
