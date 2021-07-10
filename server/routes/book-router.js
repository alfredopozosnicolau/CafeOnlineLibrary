const express = require('express');

const BookController = require('../controllers/book-controller');

const router = express.Router();

router.get('/books', BookController.getBooks);
router.get('/availablebooks', BookController.getAvailableBooks);
router.get('/book/:id', BookController.getBookById);
//router.get('/item/:isbn', BookController.getBookByIsbn);
router.post('/book', BookController.createBook);
router.put('/book/:id', BookController.updateBook);
router.put('/book/borrow/:id', BookController.borrowBook);
router.put('/book/return/:id', BookController.returnBook);
router.delete('/book/:id', BookController.deleteBook);

module.exports = router;
