const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// ------------ MiddleWares----------//

app.use(express.json());
app.use(passport.initialize());

// ------------- DB-Config---------//
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', err => {
  console.log(err);
});

// ----------------Routes----------//

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

// --------------ServerStart---------//

app.listen(PORT, () => {
  console.log(`server up port ${PORT}`);
});
