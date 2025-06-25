const mongoose = require('mongoose');

const ExpertiseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    bulletPoints: {
        type: [String], // An array of strings to hold bullet points
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Expertise', ExpertiseSchema);
