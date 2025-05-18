import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Allowed file types
    public_id: (req, file) => Date.now() + "-" + file.originalname, // Unique ID
  },
});

// Create the Multer instance with Cloudinary storage
const upload = multer({ storage });

export default upload;
