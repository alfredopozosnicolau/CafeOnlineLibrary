/* eslint-disable no-undef, arrow-body-style */
const Book = require('../models/book-model');

getBooks = (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getBooks': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!books.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getBooks': Books not found`);
      return res.status(404).json({
        success: false,
        error: 'Books not found',
      });
    }
    const returnBooks = books.map(book => {
      const newBook = book.toJSON();
      newBook.link = {};
      newBook.link.self = `http://${req.headers.host}/api/book/${book._id}`;
      return newBook;
    });
    console.log(`[Hack.Diversity React Template] - 200 in 'getBooks': Books fetched!`);
    return res.status(200).json({
      success: true,
      books: returnBooks,
    });
  });
};

getAvailableBooks = (req, res) => {
  Book.find({ available: { $gt: 0 } }, (err, books) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getBooks': ${err}`);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!books.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getBooks': Books not found`);
      return res.status(404).json({
        success: false,
        error: 'Books not found',
      });
    }
    const returnBooks = books.map(book => {
      const newBook = book.toJSON();
      newBook.link = {};
      newBook.link.self = `http://${req.headers.host}/api/book/${book._id}`;
      return newBook;
    });
    console.log(`[Hack.Diversity React Template] - 200 in 'getBooks': Books fetched!`);
    return res.status(200).json({
      success: true,
      books: returnBooks,
    });
  });
};

getBookById = (req, res) => {
  Book.find({ _id: req.params.id }, (err, books) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getBookById': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!books.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getBookById': Book not found`);
      return res.status(404).json({
        success: false,
        error: 'Book not found',
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getBookById': Book fetched!`);
    return res.status(200).json({
      success: true,
      book: books[0],
    });
  });
};
getBookByIsbn = (req, res) => {
  Book.find({ isbn: req.params.isbn }, (err, books) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'getBookByIsbn': ${err}`);
      throw res.status(400).json({
        success: false,
        error: err,
      });
    }
    if (!books.length) {
      console.error(`[Hack.Diversity React Template] - 404 in 'getBookByIsbn': Book not found`);
      return res.status(404).json({
        success: false,
        error: 'Book not found',
      });
    }
    console.log(`[Hack.Diversity React Template] - 200 in 'getBookByIsbn': Book fetched!`);
    return res.status(200).json({
      success: true,
      book: books[0],
    });
  });
};

createBook = (req, res) => {
  const body = req.body;
  // console.log('----------------------- createBook: req -----------------------')
  // console.log(req);
  // console.log('----------------------- createBook: body -----------------------')
  // console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a book.',
    });
  }

  const book = new Book(body);

  if (!book) {
    console.error(`[Hack.Diversity React Template] - 400 in 'createBook': 'book' is malformed.`);
    return res.status(400).json({
      success: false,
      message: "'book' is malformed",
    });
  }

  // console.log('----------------------- createBook: Book -----------------------')
  // console.log(Book)

  return book
    .save()
    .then(() => {
      console.error(`[Hack.Diversity React Template] - 201 in 'createBook': Book created!`);
      return res.status(201).json({
        success: true,
        id: book._id,
        message: 'Book created!',
      });
    })
    .catch(err => {
      console.error(
        `[Hack.Diversity React Template] - caught error in 'createBook': ${err.errors.name}`,
      );
      // Object.keys(err.errors).forEach((errorKey) => {
      // 	console.error(`ERROR for: ${errorKey}`);
      // 	console.error(`=> ${((err.errors[errorKey] || {}).properties || {}).message}`);
      // });
      return res.status(400).json({
        success: false,
        error: err,
        message: err,
      });
    });
};

updateBook = (req, res) => {
  const body = req.body;
  // console.log('----------------------- updateBook: req -----------------------');
  // console.log(req);
  // console.log('----------------------- updateBook: body -----------------------');
  // console.log(body);
  if (!body) {
    console.error(
      `[Hack.Diversity React Template] - 400 in 'updateBook': You must provide an Book to update.`,
    );
    return res.status(400).json({
      success: false,
      error: 'You must provide an Book to update.',
    });
  }

  const bookForUpdate = {
    _id: req.params.id,
    title: body.title,
    author: body.author,
    publication_year: body.publication_year,
    publisher: body.publisher,
    image_url_s: body.image_url_s,
    image_url_m: body.image_url_m,
    image_url_l: body.image_url_l,
    copies: body.copies,
    available: body.available,
  };

  // console.log('----------------------- updateBook: res -----------------------');
  // console.log(res);

  return Book.updateOne({ _id: req.params.id }, bookForUpdate, (err, writeOpRes) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 404 in 'updateBook': Book not found!`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error: err,
        message: 'Book not found!',
        writeOpRes: writeOpRes,
      });
    }
    // TODO: make this neater
    // console.log('----------------------- updateItem: item -----------------------');
    // console.log(item);
    return res.status(200).json({
      success: true,
      id: req.params.id,
      message: 'Book Updated!',
    });
  });
};
borrowBook = (req, res) => {
  const body = req.body;

  if (!body) {
    console.error(
      `[Hack.Diversity React Template] - 400 in 'borrowBook': You must provide an Book to borrowed.`,
    );
    return res.status(400).json({
      success: false,
      error: 'You must provide an Book to borrowed.',
    });
  }

  return Book.findOneAndUpdate(
    { _id: req.params.id, available: { $gt: 0 } },
    { $inc: { available: -1 } },
    (err, writeOpRes) => {
      if (err) {
        console.error(`[Hack.Diversity React Template] - 404 in 'borrowBook': Book not found!`);
        console.error(err);
        return res.status(404).json({
          success: false,
          error: err,
          message: 'Book not found!',
          writeOpRes: writeOpRes,
        });
      }

      return res.status(200).json({
        success: true,
        id: req.params.id,
        message: 'Book Borrowed!',
      });
    },
  );
};
returnBook = (req, res) => {
  const body = req.body;
  // console.log('----------------------- updateBook: req -----------------------');
  // console.log(req);
  // console.log('----------------------- updateBook: body -----------------------');
  // console.log(body);
  if (!body) {
    console.error(
      `[Hack.Diversity React Template] - 400 in 'returnBook': You must provide an Book to return.`,
    );
    return res.status(400).json({
      success: false,
      error: 'You must provide an Book to return.',
    });
  }
  return Book.findOneAndUpdate(
    { _id: req.params.id, "$expr": { "$lt": [ "$available" , "$copies" ] }},
    { $inc: { available: 1 } },
    (err, writeOpRes) => {
      if (err) {
        console.error(`[Hack.Diversity React Template] - 404 in 'returnBook': Book not found!`);
        console.error(err);
        return res.status(404).json({
          success: false,
          error: err,
          message: 'Book not found!',
          writeOpRes: writeOpRes,
        });
      }
      return res.status(200).json({
        success: true,
        id: req.params.id,
        message: 'Book Returned!',
      });
    },
  );
};

deleteBook = (req, res) => {
  Book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
    if (err) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deleteBook': ${err}`);
      return res.status(400).json({
        succes: false,
        error: err,
      });
    }

    if (!book) {
      console.error(`[Hack.Diversity React Template] - 400 in 'deleteBook': Book not found!`);
      return res.status(400).json({
        success: false,
        error: 'Book not found!',
      });
    }

    return res.status(200).json({
      success: true,
      book: book,
    });
  });
};

module.exports = {
  getBooks,
  getAvailableBooks,
  getBookById,
  getBookByIsbn,
  createBook,
  updateBook,
  deleteBook,
  returnBook,
  borrowBook,
};
