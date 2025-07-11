const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// =========================
// ****Middlewares****
// =========================

// Options: dev, common, short, tiny
app.use(morgan('dev'));

// Middleware: if we disable this, req.body will be undefined
app.use(express.json());

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// =========================
// **** Route Handlers ****
// =========================

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    // JSEND format
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  // Find method: returns an array which only contains an element with this condition is true
  const id = req.params.id * 1; // convert string to number
  const tour = tours.find((tour) => tour.id === id);

  // Two solutions
  // if (id > tours.length) {
  if (!tour) {
    // Use return to exit
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'Could not save tour',
        });
      }

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    // Use return to exit
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    // Use return to exit
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // 204 means no content
  res.status(204).json({
    status: 'success',
    // We send to show the resource was deleted and does not exist anymore
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// ======================
// * Callbacks
// ======================

// app.get('/api/v1/tours', getAllTours);

// add ? to make id optional
// app.get('/api/v1/tours/:id?', (req, res) => {
// Get a tour
// app.get('/api/v1/tours/:id?', getTour);

// // Create a tour
// app.post('/api/v1/tours', createTour);

// // Patch is better than
// app.patch('/api/v1/tours/:id', updateTour);

// // Delete a tour
// app.delete('/api/v1/tours/:id', deleteTour);

// Get all tours and create

// ************
//  Routes
// ************
// We created a sub app

const tourRouter = express.Router();
const userRouter = express.Router();

// *****************
//  Tour Router
// *****************
tourRouter.route('/').get(getAllTours).post(createTour);
// Get a tour, update it, and delete it
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// *****************
//  User Router
// *****************
userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
