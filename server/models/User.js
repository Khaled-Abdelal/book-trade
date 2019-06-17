/* eslint-disable func-names */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, max: 255 },
  photo: String,
  googleId: String,
  facebookId: String
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  console.log(user.id, 'userID');
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
