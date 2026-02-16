require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cookieParser());

// ================= CORS (PRODUCTION SAFE) =================
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      // Allow localhost (development)
      if (origin.includes("localhost")) {
        return callback(null, true);
      }

      // Allow any Vercel deployment URL
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

// ================= ROUTES =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/roles", require("./routes/roles"));
app.use("/api/sites", require("./routes/sites"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/timezones", require("./routes/timezone"));

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("Tenant Management API Running 🚀");
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error"
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
