const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
// Appionment Route
// POST: Create a new appointment
router.post('/appointment', async (req, res) => {
    const { name, contact, date, subject, message } = req.body;

    try {
        const selectedDate = new Date(date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Midnight for accurate comparison

        if (selectedDate < currentDate) {
            return res.status(400).json({ error: 'Date must be today or a future date' });
        }

        const newAppointment = new Appointment({
            name,
            contact,
            date: selectedDate,
            subject,
            message,
            status: 'progress' // Default status
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Retrieve all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET by ID: Retrieve a specific appointment
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Update an existing appointment
router.put('/:id', async (req, res) => {
    try {
        const { name, contact, date, subject, message } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { name, contact, date, subject, message },
            { new: true }
        );
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Remove an appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/appointment/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!['completed', 'reject'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment status updated successfully', appointment: updatedAppointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
