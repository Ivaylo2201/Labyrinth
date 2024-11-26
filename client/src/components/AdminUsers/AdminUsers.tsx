import { Trash2 } from "lucide-react";
import useAdminUsers from "../../hooks/useAdminUsers";
import { Axios } from "../../helpers/http";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AdminUsers = () => {
  const { data } = useAdminUsers();
  const queryClient = useQueryClient(); // For invalidating queries
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteUser = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in.");
      return;
    }
    try {
      await Axios.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleted(false);
      }, 4000);

      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div>
      <div className="absolute top-0 right-0">
        <h2
          className={`bg-green-500 px-8 py-2 m-2 rounded-full transition-transform duration-500 ease-out ${
            isDeleted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          Delete successfully!
        </h2>
      </div>

      <h1 className="text-2xl font-bold mb-4">Users Page</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-white bg-gray-800">
              <th className="border px-4 py-2 text-left font-semibold text-white bg-gray-800">
                Email
              </th>
              <th className="border px-4 py-2 text-left font-semibold">Role</th>
              <th className="border px-4 py-2 text-left font-semibold">Username</th>
              <th className="border px-4 py-2 text-left font-semibold">Phone Number</th>
              <th className="border px-4 py-2 text-left font-semibold">Location</th>
              
              <th className="border px-4 py-2 text-left font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((user, index) => (
                <tr key={index} className="hover:bg-gray-300">
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.phone_number}</td>
                  <td className="border px-4 py-2">{user.location}</td>
                  <td className="flex justify-center items-center">
                    <button
                      className="text-red-600 disabled:text-gray-600 w-full flex justify-center items-center"
                      disabled={user.role === "admin"}
                      onClick={() => deleteUser(user.id)}
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

export default AdminUsers;
