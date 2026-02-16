const StatCard = ({ title, value }) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:border-indigo-400/40">
      
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>

      <div className="relative z-10">
        <p className="text-gray-400 uppercase tracking-wider text-sm">
          {title}
        </p>

        <h2 className="text-5xl font-bold mt-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          {value || 0}
        </h2>
      </div>
    </div>
  );
};

export default StatCard;
