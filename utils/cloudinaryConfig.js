// cloudinary.js
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("File path is missing");
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath); // Remove local file after upload
    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    fs.unlinkSync(localFilePath); // Remove local file on error
    throw error;
  }
};


const deleteFromCloudinary = async(publicId)=>{
    try {
        await v2.uploader.destroy(publicId);
    } catch (error) {
        return res.status(500).send("Internal Error!");
    }
}

module.exports  = {uploadOnCloudinary, deleteFromCloudinary};