const express = require('express');

const app = express();
//const PORT = 3000;

const MY_PORT = process.env.PORT || 3000;

app.listen(MY_PORT, (error) =>{
  if(!error)
    console.log("Server is Successfully Running, and App is listening on port "+ MY_PORT)
  else
    console.log("Error occurred, server can't start. ", error);
  }
);