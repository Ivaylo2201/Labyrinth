import useAdminUsers from "../../hooks/useAdminUsers";

const AdminUsers = () => {
    const { data} = useAdminUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold">Users Page</h1>
    </div>
  );
};

export default AdminUsers;
