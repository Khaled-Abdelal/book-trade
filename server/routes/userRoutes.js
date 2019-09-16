const express = require('express');
const User = require('../models/User');
const Book = require('../models/Book')
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'name photo numberOfBooks', {
      limit: parseInt(req.query.limit, 10),
      skip: parseInt(req.query.skip, 10),
      sort: {
        numberOfBooks: -1
      }
    });
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const books = await Book.find({ owner: req.params.id }).populate('owner');
    const user = await User.findById(req.params.id);
    return res.send({ books, user });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/auth/me', auth, async (req, res) => {
  return res.send(req.user);
});
module.exports = router;
