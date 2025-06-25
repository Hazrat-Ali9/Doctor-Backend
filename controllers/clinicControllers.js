const Hospital = require('../models/Clinic');
const cloudinary = require('../utils/cloudinaryConfig');

exports.addHospital = async (req, res) => {
  const { logo, contactNumber, email, openingTime, closingTime, openingDays, location, footerText } = req.body;
  console.log(req.body);

  if (!logo || !contactNumber || !email || !openingTime || !closingTime || !openingDays || !location || !footerText) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    // Your logic to save the hospital to the database
    const newHospital = new Hospital({
      logo,
      contactNumber,
      email,
      openingTime,
      closingTime,
      openingDays,
      location,
      footerText
    });

    await newHospital.save();
    
    res.status(201).json({ msg: 'Hospital added successfully', hospital: newHospital });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};


exports.updateHospital = async (req, res) => {
  const { contactNumber, email, openingTime, closingTime, openingDays, location, footerText } = req.body;

  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ msg: 'Hospital not found' });
    }

    // Update logo if a new file is provided
    if (req.files && req.files.logo) {
      const file = req.files.logo;
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
      hospital.logo = uploadResult.secure_url;
    }

    // Update other fields
    hospital.contactNumber = contactNumber || hospital.contactNumber;
    hospital.email = email || hospital.email;
    hospital.openingTime = openingTime || hospital.openingTime;
    hospital.closingTime = closingTime || hospital.closingTime;
    hospital.openingDays = openingDays || hospital.openingDays;
    hospital.location = location || hospital.location;
    hospital.footerText = footerText || hospital.footerText;

    await hospital.save();
    res.json({ msg: 'Hospital updated successfully', hospital });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};


exports.getAllHospitals = async (req, res) => {
    try {
      const hospitals = await Hospital.find();
      res.json(hospitals);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };