const Site = require("../models/Site");

exports.getSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSite = async (req, res) => {
  try {
    const site = await Site.create(req.body);
    res.json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSite = async (req, res) => {
  try {
    const site = await Site.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    await Site.findByIdAndDelete(req.params.id);
    res.json({ message: "Site deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
