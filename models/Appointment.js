// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    date: { type: Date, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['progress', 'completed', 'failed'],
        default: 'progress'
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
