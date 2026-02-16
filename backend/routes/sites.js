const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getSites,
  createSite,
  updateSite,
  deleteSite
} = require("../controllers/siteController");

/**
 * @route   GET /api/sites
 * @desc    Get all sites
 * @access  Private
 */
router.get("/", auth, getSites);

/**
 * @route   POST /api/sites
 * @desc    Create site
 * @access  Private
 */
router.post("/", auth, createSite);

/**
 * @route   PUT /api/sites/:id
 * @desc    Update site
 * @access  Private
 */
router.put("/:id", auth, updateSite);

/**
 * @route   DELETE /api/sites/:id
 * @desc    Delete site
 * @access  Private
 */
router.delete("/:id", auth, deleteSite);

module.exports = router;
