const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, max: 1024 },
  authors: [String],
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
