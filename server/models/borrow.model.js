import mongoose from "mongoose";

const borrowingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", 
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date
    },
    returnDate: {
      type: Date,
    },
    borrowStatus: {
      type: String,
      enum: ["borrowed","requested", "not requested"],
      default: "requested",
    },
    returnStatus: {
      type: String,
      enum: ["returned", "requested", "not requested"],
      default: "not requested",
    },
    fine: {
      type: Number,
      default: 0, // You can compute this based on due date and return date
    },
  },
  { timestamps: true } 
);

const Borrowing = mongoose.model("Borrowing", borrowingSchema);

export default Borrowing;
