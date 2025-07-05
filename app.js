const express = require('express');

const app = express();

app.get('/', (req, res) => {
  // res.status(200).send('Hello From the server!');
  res.status(200).json({
    message: 'Hello From the server!',
    app: 'Natours',
  });
});

app.post('/', (req, res) => {
  res.status(200).send('You can post to this endpoint');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
