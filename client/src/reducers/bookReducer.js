import * as types from '../actions/actionTypes';

const initialState = {
  loading: false,
  loaded: false,
  books: [],
  book: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_SINGLE_BOOK:
    case types.LOADING_ALL_BOOKS:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case types.LOADING_ALL_AVAILABLE:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case types.SET_ALL_BOOKS:
      return {
        ...state,
        loading: false,
        loaded: true,
        books: action.books,
      };
    case types.SET_ALL_AVAILABLE:
      return {
        ...state,
        loading: false,
        loaded: true,
        books: action.books,
      };
    case types.GET_SINGLE_BOOK:
      return {
        ...state,
        loading: false,
        loaded: true,
        book: action.book,
      };
    case types.SET_SINGLE_BOOK:
      return {
        ...state,
        loading: false,
        loaded: true,
        books: [...state.books, action.book],
        book: action.book,
      };
    case types.UPDATE_SINGLE_BOOK:
      console.log('initial:');
      console.log(state.books);
      let newbooks = state.books.map((book, i) => {
        debugger;
        if (book._id === action.book._id) {
          book = action.book;
        }
        return book;
      });
      console.log('altered:');
      console.log(newbooks);
      return {
        ...state,
        loading: false,
        loaded: true,
        books: newbooks,
        book: action.book,
      };
    case types.BORROW_SINGLE_BOOK:
      console.log('initial:');
      console.log(state.books);
      let borrowedbooks = state.books.map((book, i) => {
        debugger;
        if (book._id === action.book._id) {
          book = action.book;
        }
        return book;
      });
      console.log('borrowed:');
      console.log(borrowedbooks);
      return {
        ...state,
        loading: false,
        loaded: true,
        books: borrowedbooks,
        book: action.book,
      };
    case types.RETURN_SINGLE_BOOK:
      console.log('initial:');
      console.log(state.books);
      let returnedbooks = state.books.map((book, i) => {
        debugger;
        if (book._id === action.book._id) {
          book = action.book;
        }
        return book;
      });
      console.log('returned:');
      console.log(returnedbooks);
      return {
        ...state,
        loading: false,
        loaded: true,
        books: returnedbooks,
        book: action.book,
      };

    // TODO: after users are created
    // case types.FETCH_USER_book:
    //   return { ...state, book: action.book }
    default:
      return state;
  }
};

export default bookReducer;
