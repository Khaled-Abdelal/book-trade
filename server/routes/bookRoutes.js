const express = require('express');
const color = require('img-color');
const Color = require('color');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const Vibrant = require('node-vibrant')

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
    // const url = req.body.cover.thumbnail;
    // const { dColor } = await color.getDominantColor(url);
    // let dominantColor = Color(`#${dColor}`);
    // console.log('hit');
    // while (dominantColor.isLight()) {
    //   console.log('darken');
    //   dominantColor = dominantColor.darken(0.1);
    // }
    // dominantColor = dominantColor.hex();
    const palette = await Vibrant.from(req.body.cover.thumbnail).getPalette()
    const book = await new Book({ ...req.body, owner: req.user.id, dominantColor: Color(palette.DarkMuted.rgb).hex() }).save();
    console.log(book)

    req.user.numberOfBooks += 1;
    await req.user.save();
    return res.status(201).send(book);
  } catch (err) {
    console.log(err)
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
