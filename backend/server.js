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

// ================= SEED ADMIN (TEMPORARY) =================
app.get("/seed-admin", async (req, res) => {
  try {
    const existing = await User.findOne({ email: "admin@test.com" });

    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
    });

    res.json({
      message: "Admin created successfully",
      admin,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
