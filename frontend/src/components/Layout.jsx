import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Roles", path: "/roles" },
    { name: "Sites", path: "/sites" }
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col">

        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          Tenant<span className="text-cyan-400">Pro</span>
        </h1>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                  : "hover:bg-white/10 text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-10">
          <button
            onClick={logout}
            className="w-full px-4 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
