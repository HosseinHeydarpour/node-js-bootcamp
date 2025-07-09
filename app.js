const express = require('express');
const fs = require('fs');

const app = express();

// Middleware: if we disable this, req.body will be undefined
app.use(express.json());

// app.get('/', (req, res) => {
//   // res.status(200).send('Hello From the server!');
//   res.status(200).json({
//     message: 'Hello From the server!',
//     app: 'Natours',
//   });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint');
// });

// ======================
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    // JSEND format
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// add ? to make id optional
// app.get('/api/v1/tours/:id?', (req, res) => {
app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
