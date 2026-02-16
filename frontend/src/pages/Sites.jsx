import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

const Sites = () => {
  const [sites, setSites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    status: "active"
  });

  const fetchSites = async () => {
    try {
      const res = await axios.get("/sites");
      setSites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createSite = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/sites", form);
      setForm({ name: "", location: "", status: "active" });
      setIsOpen(false);
      fetchSites();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/sites/${id}`, { status });
      fetchSites();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSite = async (id) => {
    try {
      await axios.delete(`/sites/${id}`);
      fetchSites();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-10">Sites</h1>

      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white"
      >
        + Create Site
      </button>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 uppercase text-sm tracking-wider">
            <tr>
              <th className="p-6">Name</th>
              <th>Location</th>
              <th>Status</th>
              <th className="text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr
                key={site._id}
                className="border-t border-white/10 hover:bg-white/5 transition-all"
              >
                <td className="p-6">{site.name}</td>
                <td>{site.location}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      site.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {site.status}
                  </span>
                </td>
                <td className="text-right pr-6 space-x-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        site._id,
                        site.status === "active" ? "inactive" : "active"
                      )
                    }
                    className={`px-4 py-2 rounded-xl transition ${
                      site.status === "active"
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    }`}
                  >
                    {site.status === "active"
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    onClick={() => deleteSite(site._id)}
                    className="px-4 py-2 rounded-xl bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 transition"
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
            <h2 className="text-2xl font-bold mb-8">Create Site</h2>

            <form onSubmit={createSite} className="space-y-4">
              <input
                name="name"
                placeholder="Site Name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-400"
                value={form.name}
                onChange={handleChange}
              />

              <input
                name="location"
                placeholder="Location"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-400"
                value={form.location}
                onChange={handleChange}
              />

              <select
                name="status"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

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

export default Sites;
