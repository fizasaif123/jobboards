const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/jobboardgreenblue", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Job Board Backend is running!");
});
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
