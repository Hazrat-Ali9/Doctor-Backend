// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    patientName: { type: String, required: [true, 'Patient Name is required'], trim: true },
    date: { type: Date, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    message: { type: String, required: [true, 'Message is required'], trim: true }
});

module.exports = mongoose.model('Review', reviewSchema);
