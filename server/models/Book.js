const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, max: 1024 },
  authors: [String],
  description: String,
  cover: Object,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  averageRating: { type: Number },
  ratingsCount: { type: Number }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
