const axios = require("axios");

exports.getTimezones = async (req, res) => {
  try {
    const response = await axios.get(
      "https://worldtimeapi.org/api/timezone"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
