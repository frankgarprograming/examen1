// npm init
// npm install express
// npm --version express

const express = require('express');
const app = express();

// Define routes and middleware here
// ...

const MY_PORT = process.env.PORT || 3000;

app.listen(MY_PORT, () => {
  console.log(`Server running on port ${MY_PORT}`);
});