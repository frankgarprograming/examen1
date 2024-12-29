// Middleware functions are functions that have access to:
//  the request object (req), 
//  the response object (res), 
//  and the "next()" function 
// in the application’s request-response cycle. 
// The next function is a function in the Express router which, when invoked, 
// executes the middleware succeeding the current middleware.

// If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. 
// Otherwise, the request will be left hanging.

// Middleware can process request objects multiple times before the server works for that request.
// Middleware can be used to add logging and authentication functionality.
// Middleware improves client-side rendering performance.
// Middleware is used for setting some specific HTTP headers.
// Middleware helps with Optimization and better performance.

const express = require('express')
const app = express()

app.get('/', function(req, res, next) {
  next();
})

app.get('/myPath', (req, res, next) => {}, (req, res) => {})

app.listen(3000)

app.get(
  "/myOtherPath",
  (req, res, next) => {
      console.log("hello");
      next();
  },
  (req, res) => {
      res.send(
          `<div>
              <h2>Welcome to GeeksforGeeks</h2>
              <h5>Tutorial on Middleware</h5>
          </div>`
      );
  }
);

//////////////////////////////////////////

// Configurable middleware can be used as shown below.

/*
const mw = require('./myMiddleware.js')

app.use(mw({ option1: '1', option2: '2' }))

app.listen(3000)

*/