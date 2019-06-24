const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const match = {};
  if (req.query.author) {
    match.authors = req.query.author;
  }
  try {
    const books = await Book.find(match, null, {
      limit: parseInt(req.query.limit, 10),
      skip: parseInt(req.query.skip, 10)
    }).populate('owner');
    return res.send(books);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/auth', auth, async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id }, null, {
      limit: parseInt(req.query.limit, 10),
      skip: parseInt(req.query.skip, 10)
    });
    return res.send(books);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const book = await new Book({ ...req.body, owner: req.user.id }).save();
    req.user.numberOfBooks += 1;
    await req.user.save();
    return res.status(201).send(book);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ owner: req.user.id, _id: req.params.id });
    if (!book) {
      return res.status(404).send();
    }
    req.user.numberOfBooks -= 1;
    await req.user.save();
    return res.send(book);
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
