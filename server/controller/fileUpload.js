import { v2 as cloudinary } from 'cloudinary';

export const uploadImageToCloudinary = async (filePath, folder = "uploads") => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      use_filename: true, // Keeps original filename (optional)
      unique_filename: false, // Avoids random hashes (optional)
      overwrite: true // Allows overwriting if file exists (optional)
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};


export const uploadFileToCloudinary = async (
  filePath,
  folder = "uploads",
  resourceType = "auto"
) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: resourceType, // Critical for non-image files
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(`Failed to upload file to Cloudinary: ${error.message}`);
  }
};

// // Upload an image (default behavior)
// const imageUrl = await uploadFileToCloudinary("./photo.jpg");

// // Upload a PDF explicitly
// const pdfUrl = await uploadFileToCloudinary("./document.pdf", "documents", "raw");

// // Let Cloudinary auto-detect (works for both images/PDFs)
// const anyFileUrl = await uploadFileToCloudinary("./file", "mixed", "auto");
