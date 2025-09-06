const express = require('express');

const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// =========================
// **** Middlewares ****
// =========================

// Options: dev, common, short, tiny

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware: if we disable this, req.body will be undefined
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// In this way express knows that we are defining a middleware
//  If we dont call next, the request will be stuck
//
// app.use((req, res, next) => {
//   console.log('Hello From the middleware!');
//   next();
// });

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

// If we reach this point of stack none of handlers above did not catch it
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Cannot find ${req.originalUrl} on this server!`,
  // });
  const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';

  // It will skip all other middleware and goes to the error handling middleware
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
