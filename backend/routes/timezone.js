const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { getTimezones } = require("../controllers/timezoneController");

/**
 * @route   GET /api/timezones
 * @desc    Fetch timezone list from external API
 * @access  Private
 */
router.get("/", auth, getTimezones);

module.exports = router;
