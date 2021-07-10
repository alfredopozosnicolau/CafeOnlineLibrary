import https from 'https';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  hostname: 'http://localhost:3000/',
  httpsAgent: https.Agent({
    rejectUnauthorized: false,
  }),
});

// TODO - use interceptors for better error handling: https://masteringjs.io/tutorials/axios/interceptors#error-handling

export const getAllBooks = payload => api.get(`/books`, payload);
export const getAllAvailableBooks = payload => api.get(`/availablebooks`, payload);
export const getBookById = id => api.get(`/book/${id}`);
export const insertBook = payload => api.post(`/book`, payload);
export const updateBookById = (id, payload) => api.put(`/book/${id}`, payload);
export const deleteBookById = id => api.delete(`/book/${id}`);
export const borrowBookById = id => api.put(`/book/borrow/${id}`);
export const returnBookById = id => api.put(`/book/return/${id}`);
const apis = {
  getAllBooks,
  getBookById,
  insertBook,
  updateBookById,
  deleteBookById,
  getAllAvailableBooks,
  returnBookById,
  borrowBookById,
};

export default apis;
