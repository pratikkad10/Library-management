import express from 'express';
import { 
    borrowBook, 
    borrowHistory, 
    deleteBookById, 
    fetchAllBooks,
    fetchBookbyId, 
    getBorrowedBooks, 
    newBook, 
    returnBook, 
    searchBooks, 
    updateBook 

} from '../controller/books.controller.js';
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
bookRoutes.post('/borrow/:bookId', borrowBook);

// GET /borrow: To view all borrowed books by a user.
bookRoutes.get('/borrow', getBorrowedBooks);       //use isStudent or isStaff middleware

// POST /return: To return a borrowed book.
bookRoutes.put('/return', returnBook);


// GET /borrow/history: To view the borrowing history.
bookRoutes.get('/borrow/history', borrowHistory);

// GET /books/search
bookRoutes.get('/search', searchBooks);

export default bookRoutes;

//middlewares implementation is remaining