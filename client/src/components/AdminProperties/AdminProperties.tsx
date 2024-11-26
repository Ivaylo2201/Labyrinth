import { Trash2 } from "lucide-react";
import useProperties from "../../hooks/useProperties";

const AdminProperties = () => {
  const { data } = useProperties();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Properties Page</h1>
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
              <th className="border px-4 py-2 text-left font-semibold ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((property) => (
                // ...
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
                  <td className="border px-4 py-2 flex justify-center align-middle">
                    <button className="text-red-500">
                      <Trash2></Trash2>
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
