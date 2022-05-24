require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database."));

app.use(express.json());

const vehicleRouter = require("./routes/vehicle");

app.use("/vehicle", vehicleRouter);

app.listen(5000, () => console.log("Server running on port 5000."));
