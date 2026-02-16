import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";
import UserModal from "../components/UserModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const limit = 5;

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `/users?page=${page}&limit=${limit}&search=${search}`
      );
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  // Activate / Deactivate Toggle
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/users/${id}`, { status });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-10">Users</h1>

      {/* Create User Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
      >
        + Create User
      </button>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search users..."
          className="w-80 px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 focus:outline-none focus:border-indigo-400 text-white"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 uppercase text-sm tracking-wider">
            <tr>
              <th className="p-6">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-white/10 hover:bg-white/5 transition-all"
              >
                <td className="p-6">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="text-right pr-6">
                  <button
                    onClick={() =>
                      updateStatus(
                        user._id,
                        user.status === "active" ? "inactive" : "active"
                      )
                    }
                    className={`px-4 py-2 rounded-xl transition ${
                      user.status === "active"
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    }`}
                  >
                    {user.status === "active"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-4 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-xl ${
              page === i + 1
                ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={fetchUsers}
      />
    </Layout>
  );
};

export default Users;
