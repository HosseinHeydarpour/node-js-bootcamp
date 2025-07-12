const express = require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const morgan = require('morgan');
const app = express();

// =========================
// **** Middlewares ****
// =========================

// Options: dev, common, short, tiny
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware: if we disable this, req.body will be undefined
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// In this way express knows that we are defining a middleware
//  If we dont call next, the request will be stuck
//
app.use((req, res, next) => {
  console.log('Hello From the middleware!');
  next();
});

app.use((req, res, next) => {
  // Middleware to add request time
  req.requestTime = new Date().toISOString();
  next();
});

// =========================
// **** Route Handlers ****
// =========================

app.use('/api/v1/users', userRouter);

app.use('/api/v1/tours', tourRouter);

module.exports = app;
