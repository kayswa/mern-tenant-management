const Role = require("../models/Role");
const User = require("../models/User");

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const assigned = await User.findOne({ role: req.params.id });

    if (assigned) {
      return res.status(400).json({
        message: "Cannot delete role assigned to users"
      });
    }

    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
