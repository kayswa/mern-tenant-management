require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// ================= ROUTES =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/roles", require("./routes/roles"));
app.use("/api/sites", require("./routes/sites"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/timezones", require("./routes/timezone"));

// ===================================================
// TEMP ADMIN CREATION (Run Once)
// ===================================================
app.get("/seed-admin", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: "admin@test.com",
    });

    if (existingUser) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      status: "active",
    });

    res.json({
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ===================================================
// FORCE RESET ADMIN PASSWORD (Temporary)
// ===================================================
app.get("/reset-admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const updated = await User.findOneAndUpdate(
      { email: "admin@test.com" },
      { password: hashedPassword },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.json({
      message: "Password reset successfully to 123456",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("Tenant Management API Running");
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
