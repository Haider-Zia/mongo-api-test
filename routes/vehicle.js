const { Router } = require("express");

const vehicleRouter = Router();
const Vehicle = require("../models/vehicle");

// ROUTES
// Get all vehicles
vehicleRouter.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    return res.json(vehicles);
  } catch (error) {
    return res.status(500).json(error);
  }
});
// Get a vehicle
vehicleRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const vehicle = await Vehicle.findById(id);
    return res.json(vehicle);
  } catch (error) {
    return res.status(404).json(error);
  }
});
// Create a vehicle
vehicleRouter.post("/", async (req, res) => {
  const vehicle = new Vehicle({
    title: req.body.title,
    type: req.body.type,
    make: req.body.make,
    city: req.body.city,
    priceRange: req.body.priceRange,
    year: req.body.year,
    color: req.body.color,
    mileage: req.body.mileage,
    rating: req.body.rating,
    condition: req.body.condition,
    sellerInfo: req.body.sellerInfo,
  });
  try {
    const newVehicle = await vehicle.save();
    return res.status(201).json(newVehicle);
  } catch (error) {
    return res.status(400).json(error);
  }
});
// Update a vehicle
vehicleRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  let vehicle;
  try {
    vehicle = await Vehicle.findById(id);
    if (vehicle == null) {
      return res.status(404).json({ message: "Vehicle not found." });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  if (req.body.title != null) vehicle.title = req.body.title;
  if (req.body.type != null) vehicle.type = req.body.type;
  if (req.body.make != null) vehicle.make = req.body.make;
  if (req.body.city != null) vehicle.city = req.body.city;
  if (req.body.priceRange != null) vehicle.priceRange = req.body.priceRange;
  if (req.body.year != null) vehicle.year = req.body.year;
  if (req.body.color != null) vehicle.color = req.body.color;
  if (req.body.mileage != null) vehicle.mileage = req.body.mileage;
  if (req.body.rating != null) vehicle.rating = req.body.rating;
  if (req.body.condition != null) vehicle.condition = req.body.condition;
  if (req.body.sellerInfo != null) vehicle.sellerInfo = req.body.sellerInfo;
  try {
    const updatedVehicle = await vehicle.save();
    return res.status(201).json(updatedVehicle);
  } catch (error) {
    return res.status(400).json(error);
  }
});
// Delete a vehicle
vehicleRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let vehicle;
  try {
    vehicle = await Vehicle.findById(id);
    if (vehicle == null) {
      return res.status(404).json({ message: "Vehicle not found." });
    }
    await vehicle.remove();
    return res.status(200).json("Vehicle deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
});
// Get vehicles by type
vehicleRouter.get("/type/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const vehicles = await Vehicle.find({ type });
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(400).json(error);
  }
});
// Get vehicles by city
vehicleRouter.get("/city/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const vehicles = await Vehicle.find({ city });
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(400).json(error);
  }
});
// Get vhicles by make
vehicleRouter.get("/make/:make", async (req, res) => {
  const { make } = req.params;
  try {
    const vehicles = await Vehicle.find({ make });
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(400).json(error);
  }
});
// Get vehicles by rating
vehicleRouter.get("/rating/:rating", async (req, res) => {
  const { rating } = req.params;
  try {
    const vehicles = await Vehicle.find({ rating });
    return res.status(200).json(vehicles);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = vehicleRouter;
