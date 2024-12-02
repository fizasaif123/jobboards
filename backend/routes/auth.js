const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Job = require("../models/Job"); // Adjust the path if needed

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role, tradeType, location } = req.body;

  // Basic validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate role
  if (!["client", "tradeperson"].includes(role)) {
    return res.status(400).json({ error: "Invalid role. Must be 'client' or 'tradeperson'." });
  }

  // Additional validation for tradespeople
  if (role === "tradeperson") {
    if (!tradeType || !location || !Array.isArray(location) || location.length !== 2) {
      return res
        .status(400)
        .json({ error: "Trade type and valid location (longitude, latitude) are required for tradespeople." });
    }
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    // Include tradeType and location only for tradespeople
    if (role === "tradeperson") {
      userData.tradeType = tradeType;
      userData.location = { type: "Point", coordinates: location };
    }

    // Save user to the database
    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: "Registration successful", userId: user._id });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: "Error registering user" });
  }
});

module.exports = router;









// Login a user (client or tradesperson)
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find the user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or role" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({ error: "Error logging in user" });
  }
});

router.get("/matched-jobs", async (req, res) => {
  const { userId } = req.query;

  try {
    // Fetch the tradesperson's details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure the user has valid location data
    if (!user.location || !user.location.coordinates) {
      return res.status(400).json({ error: "User location data is invalid" });
    }

    const maxDistanceInMeters = 10000; // 10 km

    // Step 1: Find jobs nearby using $near
    const nearbyJobs = await Job.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: user.location.coordinates,
          },
          $maxDistance: maxDistanceInMeters,
        },
      },
      status: "open", // Only open jobs
    });

    // Step 2: Find jobs with exact location match
    const exactLocationJobs = await Job.find({
      "location.coordinates": user.location.coordinates,
      status: "open", // Only open jobs
    });

    // Combine the results and remove duplicates
    const allJobs = [
      ...new Map(
        [...nearbyJobs, ...exactLocationJobs].map((job) => [job._id, job])
      ).values(),
    ];

    // Respond with the jobs
    if (allJobs.length === 0) {
      return res.status(200).json({ message: "No matching jobs found." });
    }

    res.status(200).json(allJobs);
  } catch (error) {
    console.error("Error fetching matched jobs:", error.message);
    res.status(500).json({ error: "Error fetching matched jobs" });
  }
});

module.exports = router;
