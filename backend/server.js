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


mongoose.connect("mongodb+srv://fizasaif0233:Bh6EZ5mJi0eXSbTR@cluster0.z92ld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  
});





const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
  
// Routes

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Job Board Backend is running!");
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
