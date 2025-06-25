const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to submit a new review
router.post('/', async (req, res) => {
    const { patientName, date, time, rating, message } = req.body;

    // Input validation
    if (!patientName || !message || !rating || !date || !time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    try {
        const review = new Review({
            patientName,
            date,
            time,
            rating,
            message
        });

        await review.save();
        res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1, time: -1 }); // Sort by date and time in descending order
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;