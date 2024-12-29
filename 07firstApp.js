const express = require('express');
app = express();

app.get('/', function (req, res) {
  res.type('text/plain');
  res.status(200);
  res.send('This is my first APP on Express.js');
});

app.listen(4000, function () {
  console.log('Listening.....');
});