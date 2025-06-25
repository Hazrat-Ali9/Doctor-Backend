const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  footerText: { type: String, required: true },
  hospitalTiming: [
    {
      day: { type: String, required: true },
      openTime: { type: String, required: true },
      closeTime: { type: String, required: true }
    }
  ],
  closedDays: [{ type: String }]
});

module.exports = mongoose.model("Setting", settingSchema);
