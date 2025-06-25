const mongoose = require('mongoose');

const WorkingHoursSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
    },
    doctorCategory: {
        type: String,
        required: true,
    },
    daysAndTiming: {
        type: [{
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // You can add more days if needed
                required: true,
            },
            time: {
                type: String,
                required: true, // Format can be adjusted if needed (e.g. 09:00 AM - 05:00 PM)
            },
        }],
        required: true,
    },
    doctorIntroduction: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('WorkingHours', WorkingHoursSchema);
