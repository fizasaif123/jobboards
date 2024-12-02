const express = require("express");
const Job = require("../models/Job");
const User = require("../models/User");
const reverseGeocode = require("../utils/reverseGeocode");
const nodemailer = require("nodemailer");
const router = express.Router();

// Post a job
// Post a job and notify tradespeople


// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "fizasaif0233@gmail.com",
    pass: "purs ytuk spoo diqz",
  },
});
// Post a job
// Post a job and notify tradespeople
router.post("/post-job", async (req, res) => {
  const { tradeType, location, description } = req.body;

  if (!tradeType || !location || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Reverse geocode location
    let address;
    try {
      address = await reverseGeocode(location[1], location[0]);
      console.log("Fetched address:", address);
    } catch (error) {
      console.error("Error during reverse geocoding:", error.message);
      address = "Unknown Location"; // Fallback address
    }

    // Save the job in the database
    const job = new Job({
      tradeType,
      location: { type: "Point", coordinates: location },
      description,
      address,
    });
    await job.save();

    // Notify tradespeople
    const tradespeople = await User.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: location },
          $maxDistance: 10000, // 10 km
        },
      },
    });

    if (tradespeople.length === 0) {
      console.log("No tradespeople found in the area.");
      return res.status(201).json({ message: "Job posted successfully, no notifications sent." });
    }

    for (const tradesperson of tradespeople) {
      if (!tradesperson.email) continue;

      const mailOptions = {
        from: '"Job Board Notifications" <your-email@gmail.com>',
        to: tradesperson.email,
        subject: "New Job Matching Your Location",
        text: `Hello ${tradesperson.name},\n\nA new job has been posted in your area:\n\nTrade Type: ${tradeType}\nLocation: ${address}\nDescription: ${description}\n\nBest Regards,\nJob Board Team`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Notification sent to ${tradesperson.email}`);
      } catch (error) {
        console.error(`Failed to send notification to ${tradesperson.email}:`, error.message);
      }
    }

    res.status(201).json({ message: "Job posted successfully and notifications sent." });
  } catch (error) {
    console.error("Error posting job or sending notifications:", error.message);
    res.status(500).json({ error: "Error posting job or sending notifications." });
  }
});

module.exports = router;


router.post("/accept", async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    // Find the tradesperson
    const user = await User.findById(userId);
    if (!user || user.role !== "tradeperson") {
      return res.status(404).json({ error: "Tradesperson not found or invalid role." });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found." });
    }

    // Check if the job is already accepted by this tradesperson
    if (user.acceptedJobs.includes(jobId)) {
      return res.status(400).json({ error: "You have already accepted this job." });
    }

    // Add the job to the tradesperson's acceptedJobs
    user.acceptedJobs.push(jobId);
    await user.save();

    res.status(200).json({ message: "Job accepted successfully." });
  } catch (error) {
    console.error("Error accepting job:", error.message);
    res.status(500).json({ error: "Error accepting job." });
  }
});


router.get("/filter", async (req, res) => {
  const { userId, filterType } = req.query;

  try {
    // Validate user
    const user = await User.findById(userId).populate("acceptedJobs");
    if (!user || user.role !== "tradeperson") {
      return res.status(404).json({ error: "Tradesperson not found or invalid role." });
    }

    let jobs = [];

    if (filterType === "area") {
      // Fetch jobs in the user's area (10km radius)
      const maxDistanceInMeters = 10000; // 10 km
      jobs = await Job.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: user.location.coordinates,
            },
            $maxDistance: maxDistanceInMeters,
          },
        },
        status: "open",
      });
    } else if (filterType === "all") {
      // Fetch all open jobs
      jobs = await Job.find({ status: "open" });
    } else if (filterType === "accepted") {
      // Fetch jobs accepted by the current tradesperson
      jobs = user.acceptedJobs;
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: "Error fetching jobs." });
  }
});
