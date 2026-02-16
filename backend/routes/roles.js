const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getRoles,
  createRole,
  updateRole,
  deleteRole
} = require("../controllers/roleController");

/**
 * @route   GET /api/roles
 * @desc    Get all roles
 * @access  Private
 */
router.get("/", auth, getRoles);

/**
 * @route   POST /api/roles
 * @desc    Create role
 * @access  Private
 */
router.post("/", auth, createRole);

/**
 * @route   PUT /api/roles/:id
 * @desc    Update role
 * @access  Private
 */
router.put("/:id", auth, updateRole);

/**
 * @route   DELETE /api/roles/:id
 * @desc    Delete role (prevent if assigned)
 * @access  Private
 */
router.delete("/:id", auth, deleteRole);

module.exports = router;
