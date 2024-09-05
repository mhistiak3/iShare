const express = require("express");

const app = express();
const port = 5050;

const server = app.listen(port, () => {
  console.log(`Server start on port: ${port}`);
});
