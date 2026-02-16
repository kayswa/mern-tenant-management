import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white">

      <div className="w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Tenant<span className="text-cyan-400">Pro</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-indigo-400"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-indigo-400"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;
