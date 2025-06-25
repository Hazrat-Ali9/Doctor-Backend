const mongoose = require('mongoose');

const PreviousAppointmentSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    paragraph: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('PreviousAppointment', PreviousAppointmentSchema);
