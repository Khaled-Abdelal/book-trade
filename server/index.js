const express = require('express');

const app = express();
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server up port ${PORT}`);
});
