const mongoose = require('mongoose');
// clinic js
const HospitalSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  openingDays: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  footerText: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Hospital', HospitalSchema);
