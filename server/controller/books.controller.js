import booksModel from "../models/books.model.js";
import {
  uploadFileToCloudinary,
  uploadImageToCloudinary
} from "./fileUpload.js";

export const newBook = async (req, res) => {
  const {
    title,
    author,
    publisher,
    published_year,
    category,
    total_copies,
    available_copies,
    synopsis,
    tags
  } = req.body;

  const coverImage = req.files?.cover_image;
  const samplePages = req.files?.sample_pages || [];
  const uploadedFiles = req.files?.uploaded_files;

  try {

    if (!title || !author || !publisher || !total_copies || !available_copies || !coverImage) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing!",
      });
    }

    const coverImageURL = coverImage  ?  await uploadImageToCloudinary(coverImage.tempFilePath): null;
    
    const samplePagesURL = [];
    for (const file of samplePages) {
      const result = await uploadImageToCloudinary(file.tempFilePath, {folder: "multiple-images"});
      samplePagesURL.push(result); 
    }

    const uploadedFilesURL = uploadedFiles ? await uploadFileToCloudinary(uploadedFiles.tempFilePath,"documents","raw"): null;

    const response = await booksModel.create({
      title,
      author,
      publisher,
      published_year,
      category,
      total_copies,
      available_copies,
      synopsis,
      tags,
      cover_image: coverImageURL,
      sample_pages: samplePagesURL,
      uploaded_files: uploadedFilesURL
    });

    res.status(200).json({
      success: true,
      message: "Book added successfully!",
      response
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Issue in adding book!",
      error: error.message
    });
  }
};

export const fetchAllBooks = async (req, res) => {
  try {
    const books = await booksModel.find({});
    if (!books) {
      return res.status(400).json({
        message: "No books found!"
      });
    }

    res.status(200).json({
      message: "Bookss fetched successfully",
      success: true,
      books
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Issue in fetching books!",
      error: error.message
    });
  }
};

export const fetchBookbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await booksModel.findById({ _id: id });
    if (!book) {
      return res.status(400).json({
        message: "No book found!"
      });
    }

    res.status(200).json({
      message: "Book fetched successfully",
      success: true,
      book
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Issue in fetching book!",
      error: error.message
    });
  }
};

export const deleteBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await booksModel.findByIdAndDelete(id);
    if (!book) {
      return res.status(400).json({
        message: "No book found!"
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      success: true,
      book
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Issue in removing book!",
      error: error.message
    });
  }
};

export const updateBook = async (req, res) => {
  const id = req.params.id;
  const {
    title,
    author,
    publisher,
    published_year,
    category,
    total_copies,
    available_copies,
    synopsis,
    tags,
  } = req.body;

  const { cover_image: coverImage, sample_pages: samplePages, uploaded_files: uploadedFiles } = req.files || {};

  try {
    if (!title || !author || !publisher || !total_copies || !available_copies || !coverImage) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing!",
      });
    }

    const updates = { title, author, publisher, published_year, category, total_copies, available_copies, synopsis, tags };

    // Update cover image if provided
    if (coverImage) {
      const coverImageURL = await uploadImageToCloudinary(coverImage.tempFilePath);
      updates.cover_image = coverImageURL;
    }

    if (samplePages) {
      const samplePagesURL = [];
      for (const file of samplePages) {
        const result = await uploadImageToCloudinary(file.tempFilePath, { folder: "multiple-images" });
        samplePagesURL.push(result);
      }
      updates.sample_pages = samplePagesURL;
    }

    if (uploadedFiles) {
      const uploadedFilesURL = await uploadFileToCloudinary(uploadedFiles.tempFilePath, "documents", "raw");
      updates.uploaded_files = uploadedFilesURL;
    }

    const book = await booksModel.findByIdAndUpdate(id, updates, { new: true });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully!",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Issue in updating book!",
      error: error.message,
    });
  }
};
