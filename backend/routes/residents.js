const express = require("express");
const router = express.Router();
const Resident = require("../models/Resident.js"); // Mongoose model

// CREATE Resident
router.post("/", async (req, res) => {
  try {
    const resident = new Resident(req.body);
    await resident.save();
    res.status(201).json(resident);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all Residents
router.get("/", async (req, res) => {
  const residents = await Resident.find();
  res.json(residents);
});

// UPDATE Resident
router.put("/:id", async (req, res) => {
  try {
    const resident = await Resident.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(resident);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Resident
router.delete("/:id", async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id);
    res.json({ message: "Resident deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
