const express = require('express');

const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// =========================
// **** Middlewares ****
// =========================

// =============================
// **** Global Middlewares ****
// =============================

// Options: dev, common, short, tiny
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Put it before all other middleware
app.use(helmet());

// Limits requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again later!',
});
//  Only effect on API Route
app.use('/api', limiter);

// Middleware: if we disable this, req.body will be undefined
app.use(
  express.json({
    limit: '10kb', // Limit request body size
  }),
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Middleware to add request time and for test
app.use((req, res, next) => {
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
  // const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  // err.statusCode = 404;
  // err.status = 'fail';

  // It will skip all other middleware and goes to the error handling middleware
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
