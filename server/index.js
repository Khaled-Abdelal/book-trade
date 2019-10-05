const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// ------------ MiddleWares----------//

app.use(express.json());
app.use(passport.initialize());
app.use(cors());

// ------------- DB-Config---------//
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', err => {
  console.log(err);
});
mongoose.set('useFindAndModify', false);

// ----------------Routes----------//

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/trade', require('./routes/tradeRoutes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));

  })

}



// --------------ServerStart---------//

app.listen(PORT, () => {
  console.log(`server up port ${PORT}`);
});
