import booksModel from "../models/books.model.js";
import Borrowing from "../models/borrow.model.js";
import User from "../models/user.model.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const totalBooks = await booksModel.countDocuments();
    const totalUsers = await User.countDocuments();
    const staffUsers = await User.countDocuments({ role: "staff" });
    const studentUsers = await User.countDocuments({ role: "student" });
    const borrowedBooks = await Borrowing.countDocuments({
      status: "borrowed"
    });
    const overdueBooks = await Borrowing.countDocuments({
      status: "borrowed",
      dueDate: { $lt: new Date() }
    });

    res.status(200).json({
      success: true,
      data: {
        totalBooks,
        totalUsers,
        borrowedBooks,
        overdueBooks,
        staffUsers,
        studentUsers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: error.message
    });
  }
};

export const getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await Borrowing.find({ borrowStatus: "borrowed" }).populate(
      "userId bookId"
    );
    res.status(200).json({ success: true, data: borrowedBooks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching borrowed books",
      error: error.message
    });
  }
};

export const getReturnedBooks = async (req, res) => {
  try {
    const returnedBooks = await Borrowing.find({ returnStatus: "returned" }).populate(
      "userId bookId"
    );
    res.status(200).json({ success: true, data: returnedBooks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching returned books",
      error: error.message
    });
  }
};

export const getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await Borrowing.find({
      borrowStatus: "borrowed",
      dueDate: { $lt: new Date() }
    }).populate("userId bookId");
    res.status(200).json({ success: true, data: overdueBooks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching overdue books",
      error: error.message
    });
  }
};

export const getPendingBookRequests = async (req, res) => {
  try {
    const pendingRequests = await Borrowing.find({
      borrowStatus: "requested"
    }).populate("userId bookId");
    res.status(200).json({ success: true, data: pendingRequests });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pending requests",
      error: error.message
    });
  }
};

export const getPendingReturnRequests = async (req, res) => {
  try {
    const pendingReturnRequests = await Borrowing.find({ returnStatus: "requested" }).populate("userId bookId");
    res.status(200).json({ success: true, data: pendingReturnRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching pending return requests", error: error.message });
  }
};

export const acceptBorrowRequest = async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await Borrowing.findByIdAndUpdate(
      requestId,
      { borrowStatus: "borrowed" },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Borrow request accepted",
      data: request
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accepting borrow request",
      error: error.message
    });
  }
};

export const acceptReturnRequest = async (req, res) => {
  const { requestId } = req.params;
  try {
    const book = await Borrowing.findByIdAndUpdate(
      requestId,
      { returnStatus: "returned" },
      { new: true }
    );

    await booksModel.findByIdAndUpdate(
      book.bookId,
      { $inc: { available_copies: 1 } },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Return request accepted",
        data: book
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error accepting return request",
        error: error.message
      });
  }
};

export const manageBookCopies = async (req, res) => {
  const { bookId, copies } = req.body;
  try {
    const book = await booksModel.findByIdAndUpdate(
      bookId,
      { $inc: { total_copies: copies, available_copies: copies } },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: "Book copies updated", data: book });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating book copies",
        error: error.message
      });
  }
};

export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ success: true, data: totalUsers });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching total users",
        error: error.message
      });
  }
};

//get most popular book

// export const getPopularBooks = async (req, res) => {
//   try {
//     const popularBooks = await Borrowing.aggregate([
//       { $group: { _id: "$bookId", borrowCount: { $sum: 1 } } },
//       { $sort: { borrowCount: -1 } },
//       { $limit: 10 },
//       { $lookup: { from: "books", localField: "_id", foreignField: "_id", as: "bookDetails" } },
//     ]);
//     res.status(200).json({ success: true, data: popularBooks });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error fetching popular books", error: error.message });
//   }
// };
