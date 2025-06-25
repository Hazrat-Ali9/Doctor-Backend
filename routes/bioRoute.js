const express = require("express");
const router = express.Router();
const Bio = require("../models/DoctorBio");

// Get Bio
router.get("/", async (req, res) => {
  try {
    const bio = await Bio.findOne();
    res.json(bio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bio" });
  }
});

// Update Bio
router.put("/", async (req, res) => {
  try {
    const updatedBio = await Bio.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true } // Create if not found
    );
    res.json(updatedBio);
  } catch (error) {
    res.status(500).json({ message: "Error updating bio" });
  }
});

module.exports = router;
