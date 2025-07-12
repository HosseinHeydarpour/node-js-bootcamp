const dotenv = require('dotenv');
// Because this is on the proccess and  the proccess is always the same for all of our js files we have access to this
dotenv.config({
  path: './config.env',
});

const app = require('./app');

// console.log(app.get('env')); // We get development by default
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
