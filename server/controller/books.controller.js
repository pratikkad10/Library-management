import booksModel from "../models/books.model.js";
import Borrowing from "../models/borrow.model.js";
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

export const borrowBook = async (req, res)=>{
    const userId = req.user.id;
    const bookId =req.params.bookId;
    try {
        const today = new Date();
        const dueDate =  new Date();
        dueDate.setDate(today.getDate() + 10); //10 days ahed

        const borrowedBook = await Borrowing.create({
            userId, 
            bookId, 
            dueDate
        });

        await booksModel.findByIdAndUpdate(
        bookId,
        { $inc: { available_copies: -1 } },                    
        { new: true })

        res.status(200).json({
        success: true,
        message: "Book borrowed successfully!",
        borrowedBook
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Issue in borrowing book!",
        error: error.message,
        });
    }
};

export const getBorrowedBooks= async (req,res)=>{
    const userId= req.user.id;
    try {

        const books= await Borrowing.find({userId:userId});
        if (!books) {
            return res.status(400).json({
            success: false,
            message: "Books not available!",})
        }
        

        res.status(200).json({
        success: true,
        message: "Books fetched successfully!",
        books
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Issue in fetching borrowed book!",
        error: error.message,
        });
    }
}

export const returnBook = async (req,res)=>{
    const bookId=req.params.bookId;
    try {
        const book = await Borrowing.findOne({ book_id: bookId, status: "borrowed" });
        if(!book){
            return res.status(400).json({
        success: false,
        message: "Book is not available!",
        });
        }

        book.status = "returned"
        book.returnDate=new Date();
        book.save();

        await booksModel.findByIdAndUpdate(
        bookId,
        { $inc: { available_copies: 1 } },      
        { new: true });

        res.status(200).json({
        success: true,
        message: "Book returned successfully!",
        book
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Issue in returning book!",
        error: error.message,
        });
    }
};


export const borrowHistory= async (req,res)=>{
    try {
        const borrowedBooks = await Borrowing.find({});
        if(!borrowedBooks){
            return res.status(400).json({
            success: false,
            message: "Books not available!",
        });
        }

        res.status(200).json({
        success: true,
        message: "Book fetched successfully!",
        borrowedBooks
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        success: false,
        message: "Issue in fetching books!",
        error: error.message,
        });
    }
};

export const searchBooks = async (req, res) => {
  const search = req.body.search; 

  try {
    const searchCondition = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { publisher: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } }
          ]
        }
      : {}; 

    const books = await booksModel.find(searchCondition);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully!",
      books
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in searching books.",
      error: error.message
    });
  }
};
