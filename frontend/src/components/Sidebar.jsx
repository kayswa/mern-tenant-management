import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`relative px-5 py-3 rounded-xl transition-all duration-300 ${
        location.pathname === path
          ? "bg-white/10 backdrop-blur-md text-white border border-white/20"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="w-72 h-screen backdrop-blur-xl bg-white/5 border-r border-white/10 p-8 flex flex-col">
      
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-12">
        TenantApp
      </h1>

      <nav className="flex flex-col gap-5">
        {navItem("/dashboard", "Dashboard")}
        {navItem("/users", "Users")}
        {navItem("/roles", "Roles")}
        {navItem("/sites", "Sites")}
      </nav>

    </div>
  );
};

export default Sidebar;
