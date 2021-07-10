// Public routes
const HOME = '/';
const ABOUT = '/about';
const SIGN_UP = '/signup';
const LOG_IN = '/login';

// Post routes
const BOOKS = '/books';
const BOOK = '/book/:id';
const BOOK_INSERT = '/Admin/create';
const BOOK_UPDATE = '/Admin/update/:id';
const BOOK_DETAILS = '/book/details/:id';
const BOOKS_BROWSE = '/books/browse';
const ADMIN = '/admin';

export const routes = {
  HOME,
  ABOUT,
  SIGN_UP,
  LOG_IN,
  BOOKS,
  BOOK,
  BOOK_INSERT,
  BOOK_UPDATE,
  BOOK_DETAILS,
  BOOKS_BROWSE,
  ADMIN,
};
