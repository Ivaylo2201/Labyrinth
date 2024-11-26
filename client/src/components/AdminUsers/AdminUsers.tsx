import { Delete, Trash2 } from "lucide-react";
import useAdminUsers from "../../hooks/useAdminUsers";
import { Axios } from "../../helpers/http";

const AdminUsers = () => {
  const { data } = useAdminUsers();

  const deleteUser = async (id: number) => {
    await Axios.delete(`/admin/users/${id}`);
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users Page</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 ">
          <thead>
            <tr className="text-white bg-gray-800">
              <th className="border px-4 py-2 text-left font-semibold text-white bg-gray-800">
                Email
              </th>
              <th className="border px-4 py-2 text-left font-semibold ">Role</th>
              <th className="border px-4 py-2 text-left font-semibold ">Username</th>
              <th className="border px-4 py-2 text-left font-semibold">Phone Number</th>
              <th className="border px-4 py-2 text-left font-semibold ">Location</th>
              <th className="border px-4 py-2 text-left font-semibold ">Delete</th>
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
                    <button className="text-red-600 " onClick={() => deleteUser}>
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

export default AdminUsers;
