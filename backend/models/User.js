const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: null
    },

    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      default: null
    },

    timezone: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
