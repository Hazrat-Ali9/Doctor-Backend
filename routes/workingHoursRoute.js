
const express = require('express');
const WorkingHours = require('../models/workingHours');

const router = express.Router();

// Create Working Hours
router.post('/add', async (req, res) => {
    try {
        const { doctorName, doctorCategory, daysAndTiming, doctorIntroduction } = req.body;

        const newWorkingHours = new WorkingHours({
            doctorName,
            doctorCategory,
            daysAndTiming,
            doctorIntroduction,
        });

        await newWorkingHours.save();
        return res.status(201).json({ message: 'Working hours added successfully', workingHours: newWorkingHours });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all Working Hours
router.get('/', async (req, res) => {
    try {
        const workingHours = await WorkingHours.find();
        res.status(200).json(workingHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Working Hours
router.put('/:id', async (req, res) => {
    try {
        const { doctorName, doctorCategory, daysAndTiming, doctorIntroduction } = req.body;

        const updatedWorkingHours = await WorkingHours.findByIdAndUpdate(req.params.id, {
            doctorName,
            doctorCategory,
            daysAndTiming,
            doctorIntroduction,
        }, { new: true });

        if (!updatedWorkingHours) {
            return res.status(404).json({ error: 'Working hours not found' });
        }

        res.status(200).json({ message: 'Working hours updated successfully', workingHours: updatedWorkingHours });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Working Hours
router.delete('/:id', async (req, res) => {
    try {
        const deletedWorkingHours = await WorkingHours.findByIdAndDelete(req.params.id);

        if (!deletedWorkingHours) {
            return res.status(404).json({ error: 'Working hours not found' });
        }

        res.status(200).json({ message: 'Working hours deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Working Hours by ID
router.get('/:id', async (req, res) => {
    try {
        const workingHours = await WorkingHours.findById(req.params.id);

        if (!workingHours) {
            return res.status(404).json({ error: 'Working hours not found' });
        }

        res.status(200).json(workingHours);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
