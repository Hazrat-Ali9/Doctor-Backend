const express = require('express');
const multer = require('multer');
const PreviousAppointment = require('../models/previousAppointment');
// previous Appionment Route
const router = express.Router();
const storage = multer.memoryStorage(); // Use memory storage for multer
const upload = multer({ storage });

// Create a Previous Appointment
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { heading, paragraph } = req.body;
        const image = req.file; // Uploaded image file

        if (!image) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Here you would upload the image to Cloudinary or handle it accordingly
        // For this example, we assume a placeholder URL
        const imageUrl = `https://your-cloudinary-url/${image.originalname}`; // Replace with actual upload logic

        const newAppointment = new PreviousAppointment({
            image: imageUrl,
            heading,
            paragraph,
        });

        await newAppointment.save();
        return res.status(201).json({ message: 'Previous appointment added successfully', appointment: newAppointment });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all Previous Appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await PreviousAppointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Previous Appointment
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { heading, paragraph } = req.body;
        const image = req.file; // Optional: the new image file if provided

        const updateData = {
            heading,
            paragraph,
        };

        if (image) {
            const imageUrl = `https://your-cloudinary-url/${image.originalname}`; // Replace with actual upload logic
            updateData.image = imageUrl; // Update image only if a new file is provided
        }

        const updatedAppointment = await PreviousAppointment.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Previous appointment updated successfully', appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Previous Appointment
router.delete('/:id', async (req, res) => {
    try {
        const deletedAppointment = await PreviousAppointment.findByIdAndDelete(req.params.id);

        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Previous appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Previous Appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await PreviousAppointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
