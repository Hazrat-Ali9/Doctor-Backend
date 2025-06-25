// routes/expertise.routes.js
const express = require('express');
const Expertise = require('../models/Expertise');

const router = express.Router();

// Create Expertise
router.post('/add', async (req, res) => {
    try {
        const { title, bulletPoints } = req.body;

        const newExpertise = new Expertise({
            title,
            bulletPoints,
        });

        await newExpertise.save();
        return res.status(201).json({ message: 'Expertise added successfully', expertise: newExpertise });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all Expertise
router.get('/', async (req, res) => {
    try {
        const expertiseList = await Expertise.find();
        res.status(200).json(expertiseList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Expertise
router.put('/:id', async (req, res) => {
    try {
        const { title, bulletPoints } = req.body;

        const updatedExpertise = await Expertise.findByIdAndUpdate(req.params.id, {
            title,
            bulletPoints,
        }, { new: true });

        if (!updatedExpertise) {
            return res.status(404).json({ error: 'Expertise not found' });
        }

        res.status(200).json({ message: 'Expertise updated successfully', expertise: updatedExpertise });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Expertise
router.delete('/:id', async (req, res) => {
    try {
        const deletedExpertise = await Expertise.findByIdAndDelete(req.params.id);

        if (!deletedExpertise) {
            return res.status(404).json({ error: 'Expertise not found' });
        }

        res.status(200).json({ message: 'Expertise deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Expertise by ID
router.get('/:id', async (req, res) => {
    try {
        const expertise = await Expertise.findById(req.params.id);

        if (!expertise) {
            return res.status(404).json({ error: 'Expertise not found' });
        }

        res.status(200).json(expertise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
