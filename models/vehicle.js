const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  make: { type: String, required: true },
  city: { type: String, required: true },
  priceRange: { type: String, required: true },
  year: { type: String, required: true },
  color: { type: String, required: true },
  mileage: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  condition: { type: String, required: true },
  sellerInfo: { type: String, required: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
