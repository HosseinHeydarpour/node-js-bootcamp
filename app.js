const express = require('express');
const fs = require('fs');

const app = express();

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
