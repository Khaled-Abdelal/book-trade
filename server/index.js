const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStratagy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ------------ MiddleWares----------//
passport.use(
  new GoogleStratagy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, 'accessToken');
      console.log(refreshToken, 'refreshToken');
      console.log(profile, 'profile');
    }
  )
);

// ------------- DB-Config---------//
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', err => {
  console.log(err);
});

// ----------------Routes----------//
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT, () => {
  console.log(`server up port ${PORT}`);
});
