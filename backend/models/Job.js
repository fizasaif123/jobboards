const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  tradeType: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  description: String,
  status: { type: String, default: "open" }, // "open", "closed"
  acceptedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of tradesperson IDs
  address: String, // Human-readable address
});

module.exports = mongoose.model("Job", JobSchema);
