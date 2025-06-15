import express from "express";
import {
  getAdminDashboard,
  getBorrowedBooks,
  getReturnedBooks,
  getOverdueBooks,
  getPendingBookRequests,
  acceptBorrowRequest,
  acceptReturnRequest,
  manageBookCopies,
//   getPopularBooks,
  getTotalUsers,
  getPendingReturnRequests,
} from "../controller/admin.controller.js";
import { isAdmin, isLoggedIn } from "../middleware/user.middleware.js";

const router = express.Router();

// Admin Dashboard
router.get("/dashboard",isLoggedIn, isAdmin, getAdminDashboard);

// Borrowed Books
router.get("/borrowed-books",isLoggedIn, isAdmin, getBorrowedBooks);

// Returned Books
router.get("/returned-books",isLoggedIn, isAdmin, getReturnedBooks);

// Overdue Books
router.get("/overdue",isLoggedIn, isAdmin, getOverdueBooks);

// Pending Borrow Requests
router.get("/borrow-requests",isLoggedIn, isAdmin, getPendingBookRequests);

// Pending Return Requests
router.get("/return-requests",isLoggedIn, isAdmin, getPendingReturnRequests);

// Accept Borrow Request
router.post("/accept-borrow/:requestId",isLoggedIn, isAdmin, acceptBorrowRequest);  //requestId is the id of the request to be accepted that is present in borrowing collection

// Accept Return Request
router.post("/accept-return/:requestId",isLoggedIn, isAdmin, acceptReturnRequest);

// Manage Book Copies
router.post("/manage-copies",isLoggedIn, isAdmin, manageBookCopies);

// Popular Books
// router.get("/popular-books", getPopularBooks);

// Total Users
router.get("/total-users",isLoggedIn, isAdmin, getTotalUsers);

export default router;
