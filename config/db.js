const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;
const connectToDB = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Failed to connect Database");
    }
}

module.exports = connectToDB;