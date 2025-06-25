const mongoose = require("mongoose");

const bioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  heading: { type: String, required: true },
  experience: [{
    startYear: String,
    endYear: String,
    description: String
  }],
  aboutMe: { type: String, required: true },
  education: [{
    degree: String,
    duration: String,
    university: String
  }],
  services: [String],
  specialization: [String],
  languagesSpoken: [String],
  professionalBackground: { type: String, required: true }
});

const Bio = mongoose.model("Bio", bioSchema);
module.exports = Bio;
