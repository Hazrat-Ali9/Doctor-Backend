// routes/settings.js
const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

// Get current settings
router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update settings
router.put("/", async (req, res) => {
  try {
    const {
      contactNumber,
      email,
      hospitalTiming,
      closedDays,
      location,
      footerText,
    } = req.body;

    // Find settings (or create if not found)
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    settings.contactNumber = contactNumber;
    settings.email = email;
    settings.hospitalTiming = hospitalTiming; // Array of day and time
    settings.closedDays = closedDays;
    settings.location = location;
    settings.footerText = footerText;

    // Save the settings
    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
