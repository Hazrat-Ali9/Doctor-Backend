const express = require('express');
const { addHospital, updateHospital, getAllHospitals } = require('../controllers/clinicControllers');
const router = express.Router();

const multer = require('multer');
const { uploadOnCloudinary } = require('../utils/cloudinaryConfig');
const cloudinary = require('cloudinary').v2;
const Hospital = require('../models/Clinic'); // Adjust path as necessary

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to add a hospital
// router.post('/add', upload.single('logo'), async (req, res) => {
//     try {
//         const { contactNumber, email, openingTime, closingTime, openingDays, location, footerText } = req.body;
//         const logo = req.file; // Uploaded file

//         if (!logo) {
//             return res.status(400).json({ error: 'Logo file is required' });
//         }

//         // Save the logo temporarily and upload to Cloudinary
//         const localFilePath = logo.path; // Use the path of the file uploaded
//         console.log("localFilePath Response: ", localFilePath);
        
//         const cloudinaryResponse = await uploadOnCloudinary(localFilePath); // Use the upload function
//         console.log("cloudinary Response: ", cloudinaryResponse);
//         const hospital = new Hospital({
//             logo: cloudinaryResponse.secure_url, // Get the URL from the Cloudinary response
//             contactNumber,
//             email,
//             openingTime,
//             closingTime,
//             openingDays: openingDays.split(','), // Ensure this is an array
//             location,
//             footerText,
//         });

//         await hospital.save();
//         return res.status(201).json({ message: 'Hospital added successfully', logo: cloudinaryResponse.secure_url });
//     } catch (error) {
//         console.error("Error adding hospital:", error);
//         return res.status(500).json({ error: error.message });
//     }
// });

router.put('/:id', updateHospital); // Update Clinic by ID
router.get('/', getAllHospitals); // Get Clinic Details

module.exports = router;
