const NodeGeocoder = require("node-geocoder");

const geocoder = NodeGeocoder({
  provider: "openstreetmap", // Free provider, no API key required
});

module.exports = geocoder;
