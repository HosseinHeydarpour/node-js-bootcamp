const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Because this is on the proccess and  the proccess is always the same for all of our js files we have access to this
dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('DB connection Successful'));

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'The tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', toursSchema);

// console.log(app.get('env')); // We get development by default
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
