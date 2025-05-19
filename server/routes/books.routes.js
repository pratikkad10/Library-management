import express from 'express';
import { deleteBookById, fetchAllBooks, fetchBookbyId, newBook, updateBook } from '../controller/books.controller.js';
const bookRoutes= express.Router();

//ADD/UPDATE book
 //add new book
bookRoutes.post('/book', newBook);

//update details of a book (Admin only).
bookRoutes.put('/:id', updateBook);

//list of all books
bookRoutes.get('/fetch', fetchAllBooks);

// GET book details
bookRoutes.get('/:id', fetchBookbyId);

//remove a book from the library (Admin only).
bookRoutes.delete('/:id', deleteBookById);




//BORROW/RETURN
// POST /borrow: To borrow a book
// GET /borrow: To view all borrowed books by a user.
// POST /return: To return a borrowed book.
// GET /borrow/history: To view the borrowing history.

// GET /books/search

export default bookRoutes;