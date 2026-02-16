const User = require("../models/User");
const Role = require("../models/Role");
const Site = require("../models/Site");

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });
    const totalRoles = await Role.countDocuments();
    const totalSites = await Site.countDocuments();

    res.json({
      totalUsers,
      activeUsers,
      totalRoles,
      totalSites
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
