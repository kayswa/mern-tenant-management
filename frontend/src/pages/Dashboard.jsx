import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRoles: 0,
    totalSites: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Active Users", value: stats.activeUsers },
    { title: "Total Roles", value: stats.totalRoles },
    { title: "Total Sites", value: stats.totalSites }
  ];

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <h2 className="text-gray-400 mb-4">{card.title}</h2>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
