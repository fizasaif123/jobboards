const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tradeType: { type: String }, // Only required for tradespeople
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number], // Longitude, Latitude
    },
  },
  role: { type: String, enum: ["client", "tradeperson"], required: true }, // Role: client or tradeperson
  acceptedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Track accepted jobs for tradespeople
});

// Add 2dsphere index only if location is defined
userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);
