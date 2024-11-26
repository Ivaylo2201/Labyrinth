import { Trash2 } from "lucide-react";
import useAdminProperties from "../../hooks/useAdminProperties";
import { Axios } from "../../helpers/http";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AdminProperties = () => {
  const { data } = useAdminProperties();
  const queryClient = useQueryClient();
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteProperty = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      return;
    }

    try {
      await Axios.delete(`/admin/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Show success notification
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleted(false);
      }, 4000);
      queryClient.invalidateQueries({ queryKey: ["adminProperties"] });
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Properties Page</h1>
      <div className="absolute top-0 right-0">
        <h2
          className={`bg-green-500 px-8 py-2 m-2 rounded-full transition-transform duration-500 ease-out ${
            isDeleted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          Delete successfully!
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-white bg-gray-800">
              <th className="border px-4 py-2 text-left font-semibold ">ID</th>
              <th className="border px-4 py-2 text-left font-semibold ">Status</th>
              <th className="border px-4 py-2 text-left font-semibold ">Type</th>
              <th className="border px-4 py-2 text-left font-semibold ">Address</th>
              <th className="border px-1 py-2 text-left font-semibold ">Bedrooms</th>
              <th className="border px-1 py-2 text-left font-semibold ">Bathrooms</th>
              <th className="border px-4 py-2 text-left font-semibold ">Price</th>
              <th className="border px-4 py-2 text-left font-semibold ">Owner</th>

              <th className="border px-4 py-2 text-left font-semibold ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((property) => (
                <tr key={property.id} className="hover:bg-gray-300">
                  <td className="border px-4 py-2">{property.id}</td>
                  <td className="border px-4 py-2">
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </td>
                  <td className="border px-4 py-2">
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </td>
                  <td className="border px-4 py-2">
                    {property.address.street}, {property.address.city}, {property.address.country}
                  </td>
                  <td className="border px-4 py-2">{property.bedrooms}</td>
                  <td className="border px-4 py-2">{property.bathrooms}</td>
                  <td className="border px-4 py-2">${property.price.toLocaleString()}</td>
                  <td className="border px-4 py-2">{property.user.email}</td>
                  <td className="border px-4 py-2 flex justify-center align-middle">
                    <button
                      className="text-red-500"
                      onClick={() => deleteProperty(property.id.toString())}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProperties;
