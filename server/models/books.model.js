import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  author: [String],
  publisher: {
    type: String,
    maxlength: 100
  },
  published_year: {
    type: Number
  },
  category: [String], 
  total_copies: {
    type: Number,
    required: true
  },
  available_copies: {
    type: Number,
    required: true
  },
  cover_image: {
    type: String,
    required: true
  }, 
  synopsis: {
    type: String
  }, 
  tags: [String], 
  sample_pages: {
    type: [String],
    default: [],
  },
  uploaded_files: {
    type:String,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model("Book", bookSchema);
