const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { getStats } = require("../controllers/dashboardController");

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard statistics
 * @access  Private
 */
router.get("/", auth, getStats);

module.exports = router;
