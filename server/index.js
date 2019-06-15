const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server up port ${PORT}`);
});
