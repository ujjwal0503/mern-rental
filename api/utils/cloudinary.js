// api/utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file) => {
  try {
    if (!file) throw new Error('No file provided');
    console.log('Uploading file:', file.path); // Debug log
    
    const result = await cloudinary.uploader.upload(file.path);
    console.log('Upload result:', result); // Debug log
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error); // Debug log
    throw new Error('Error uploading to Cloudinary: ' + error.message);
  }
};