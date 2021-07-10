import * as types from './actionTypes';
import api from '../api';

// TODO - make a utility for logging?

export const fetchAllBooks = () => {
  return dispatch => {
    dispatch({ type: types.LOADING_ALL_BOOKS });

    return api
      .getAllBooks()
      .then(resp => {
        const { books } = resp.data;
        console.log('getAllBooks: resp');
        dispatch({
          type: types.SET_ALL_BOOKS,
          books,
        });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllBookss': ${err}`);
        console.error(err);
        return err;
      });
  };
};
export const fetchAvailable = () => {
  return dispatch => {
    dispatch({ type: types.LOADING_ALL_AVAILABLE });
    return api
      .getAllAvailableBooks()
      .then(resp => {
        const { books } = resp.data;
        console.log('gotALLAvailableBooks: resp');
        dispatch({
          type: types.SET_ALL_AVAILABLE,
          books,
        });
      })
      .catch(err => {
        console.error(`ERROR in 'getAllAvailable': ${err}`);
        console.log(err);
        return err;
      });
  };
};

export const fetchSingleBook = BookId => {
  return dispatch => {
    dispatch({ type: types.LOADING_SINGLE_BOOK });

    return api
      .getBookById(BookId)
      .then(resp => {
        console.log('getbookById: resp');
        console.log(resp);
        if (resp.data.success) {
          const { book } = resp.data;
          dispatch({
            type: types.GET_SINGLE_BOOK,
            book,
          });
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'fetchSingleBook': ${err}`);
        console.error(err);
        return err;
      });
  };
};

export const insertSingleBook = book => {
  return dispatch => {
    dispatch({ type: types.LOADING_SINGLE_BOOK });

    return api
      .insertBook(book)
      .then(resp => {
        console.log('insertBook: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newBook = JSON.parse(resp.config.data);
          dispatch({
            type: types.SET_SINGLE_BOOK,
            book: {
              _id: resp.data.id,
              ...newBook,
            },
          });
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'insertSingleBook': ${err}`);
        console.error(err);
        return err;
      });
  };
};

export const updateSingleBook = book => {
  return dispatch => {
    dispatch({ type: types.LOADING_SINGLE_BOOK });

    return api

      .updateBookById(book._id, book)
      .then(resp => {
        console.log('updateBook: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newBook = JSON.parse(resp.config.data);
          debugger;
          dispatch({
            type: types.UPDATE_SINGLE_BOOK,
            book: {
              _id: resp.data.id,
              ...newBook,
            },
          });
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'updateSingleBook': ${err}`);
        console.error(err);
        return err;
      });
  };
};
export const borrowBook = BookId => {
  return dispatch => {
    dispatch({ type: types.LOADING_SINGLE_BOOK });

    return api
      .borrowBookById(BookId)
      .then(resp => {
        console.log('borrowBook: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          // const newBook = JSON.parse(resp.config.data);

          dispatch({
            type: types.BORROW_SINGLE_BOOK,
            book: {
              _id: resp.data.id,
            },
          });
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'borrowSingleBook': ${err}`);
        console.error(err);
        return err;
      });
  };
};
export const returnBook = BookId => {
  return dispatch => {
    dispatch({ type: types.LOADING_SINGLE_BOOK });

    return api
      .returnBookById(BookId)
      .then(resp => {
        console.log('returnBook: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          debugger;
          //  const newBook = JSON.parse(resp.config.data);
          dispatch({
            type: types.RETURN_SINGLE_BOOK,
            book: {
              _id: resp.data.id,
              //     ...newBook,
            },
          });
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'returnSingleBook': ${err}`);
        console.error(err);
        return err;
      });
  };
};

export const deleteSingleBook = BookId => {
  return dispatch => {
    dispatch({ type: types.LOADING_SINGLE_BOOK });

    return api
      .deleteBookById(BookId)
      .then(resp => {
        console.log('deleteBookById: resp');
        console.log(resp);
        dispatch({
          type: types.RELOAD_BOOKS,
        });
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'deleteSingleBoook': ${err}`);
        console.error(err);
        return err;
      });
  };
};
