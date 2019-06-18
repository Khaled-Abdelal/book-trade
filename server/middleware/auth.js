const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send();
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).send(err);
  }
};
