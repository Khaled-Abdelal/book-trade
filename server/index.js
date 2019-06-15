const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', err => {
  // eslint-disable-next-line no-console
  console.log(err);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server up port ${PORT}`);
});
