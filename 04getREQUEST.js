const express = require('express');
const app = express();
const PORT = 3000;

app.get('/hello', (req, res)=>{
  res.set('Content-Type', 'text/html');
  res.status(200).send("<h1>Hello Express Learner!</h1>"); // Hacer http://localhost:3000/hello
});

app.listen(PORT, (error) =>{
  if(!error)
    console.log("Server is Successfully Running, and App is listening on port "+ PORT)
  else
    console.log("Error occurred, server can't start", error);
  }
);