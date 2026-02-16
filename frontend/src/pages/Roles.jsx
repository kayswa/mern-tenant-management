import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const permissionOptions = [
    "create_user",
    "edit_user",
    "delete_user",
    "view_dashboard",
    "manage_roles",
    "manage_sites"
  ];

  const fetchRoles = async () => {
    const res = await axios.get("/roles");
    setRoles(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handlePermissionChange = (perm) => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter((p) => p !== perm));
    } else {
      setPermissions([...permissions, perm]);
    }
  };

  const createRole = async (e) => {
    e.preventDefault();
    await axios.post("/roles", { name, permissions });
    setName("");
    setPermissions([]);
    setIsOpen(false);
    fetchRoles();
  };

  const deleteRole = async (id) => {
    try {
      await axios.delete(`/roles/${id}`);
      fetchRoles();
    } catch (err) {
      toast.error("Cannot delete role assigned to users");
    }
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-10">Roles</h1>

      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
      >
        + Create Role
      </button>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 uppercase text-sm tracking-wider">
            <tr>
              <th className="p-6">Name</th>
              <th>Permissions</th>
              <th className="text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role._id}
                className="border-t border-white/10 hover:bg-white/5 transition-all"
              >
                <td className="p-6">{role.name}</td>
                <td>
                  {role.permissions?.map((perm, i) => (
                    <span
                      key={i}
                      className="mr-2 px-2 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-lg"
                    >
                      {perm}
                    </span>
                  ))}
                </td>
                <td className="text-right pr-6">
                  <button
                    onClick={() => deleteRole(role._id)}
                    className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl w-[500px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-8">Create Role</h2>

            <form onSubmit={createRole} className="space-y-4">
              <input
                placeholder="Role Name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                {permissionOptions.map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10"
                  >
                    <input
                      type="checkbox"
                      checked={permissions.includes(perm)}
                      onChange={() => handlePermissionChange(perm)}
                    />
                    {perm}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Roles;
