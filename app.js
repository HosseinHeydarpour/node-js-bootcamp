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
