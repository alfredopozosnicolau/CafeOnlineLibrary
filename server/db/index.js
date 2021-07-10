const mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose
  .connect('mongodb://localhost:27017/booksdb', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
