import { useEffect, useState } from "react";
import axios from "../api/axios";

const UserModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    site: "",
    timezone: ""
  });

  const [roles, setRoles] = useState([]);
  const [sites, setSites] = useState([]);
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios.get("/roles").then(res => setRoles(res.data));
      axios.get("/sites").then(res => setSites(res.data));
      axios.get("/timezones").then(res => setTimezones(res.data));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/users", form);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl w-[500px] shadow-2xl">
        <h2 className="text-2xl font-bold mb-8">Create User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-400"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-400"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-400"
            onChange={handleChange}
          />

          <select
            name="role"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>

          <select
            name="site"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
            onChange={handleChange}
          >
            <option value="">Select Site</option>
            {sites.map(site => (
              <option key={site._id} value={site._id}>
                {site.name}
              </option>
            ))}
          </select>

          <select
            name="timezone"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
            onChange={handleChange}
          >
            <option value="">Select Timezone</option>
            {timezones.map((tz, i) => (
              <option key={i} value={tz}>
                {tz}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default UserModal;
