const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 255 },
  author: [
    {
      name: { type: String, required: true },
      bio: { type: String },
      photo: { type: String } // URL or path to the author's photo
    }
  ],
  publisher: { type: String, maxlength: 100 },
  published_year: { type: Number },
  category: [String], // Array of category names
  total_copies: { type: Number, required: true },
  available_copies: { type: Number, required: true },
  cover_image: { type: String, required: true }, // URL or path to the book's cover image
  synopsis: { type: String }, // Brief summary of the book
  tags: [String], // Array of tags or keywords
  sample_pages: [
    {
      page_number: { type: Number, required: true },
      image: { type: String, required: true } // URL or path to the demo page image
    }
  ],
  uploaded_files: [
    {
      filename: { type: String }, // Name of the uploaded file
      file_url: { type: String, required: true } // URL or path to the uploaded file
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", bookSchema);
