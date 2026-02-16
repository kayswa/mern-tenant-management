require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

/* ===============================
   DATABASE CONNECTION
================================= */
connectDB();

/* ===============================
   MIDDLEWARE
================================= */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
  })
);

/* ===============================
   ROUTES
================================= */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/roles", require("./routes/roles"));
app.use("/api/sites", require("./routes/sites"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/timezones", require("./routes/timezone"));

/* ===============================
   FORCE PASSWORD RESET ROUTE
   (TEMPORARY – REMOVE AFTER LOGIN WORKS)
================================= */
app.get("/force-reset", async (req, res) => {
  try {
    const user = await User.findOne({
      email: "admin2@test.com" // <-- CHANGE IF DIFFERENT
    });

    if (!user) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password reset successfully to 123456"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

/* ===============================
   HEALTH CHECK
================================= */
app.get("/", (req, res) => {
  res.send("Tenant Management API Running 🚀");
});

/* ===============================
   GLOBAL ERROR HANDLER
================================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error"
  });
});

/* ===============================
   SERVER START
================================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
