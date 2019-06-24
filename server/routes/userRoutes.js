const express = require('express');
const User = require('../models/User');

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

module.exports = router;
