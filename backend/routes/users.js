const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getUsers,
  createUser,
  updateUser,
  deactivateUser
} = require("../controllers/userController");

router.get("/", auth, getUsers);
router.post("/", auth, createUser);
router.put("/:id", auth, updateUser);
router.patch("/:id/deactivate", auth, deactivateUser);

module.exports = router;
