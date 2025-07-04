const fs = require('fs');
const http = require('http');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((res, rej) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        rej('I could not read the product file');
      } else {
        res(data);
      }
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(file, data, (err) => {
      if (err) rej('I could not write the product image to file');
      res('SUCESS');
    });
  });
};

// This is a flat chain of promises
readFilePro(`${__dirname}/product.txt`)
  .then((res) => {
    console.log('Product ID:', res);
    return superagent.get(`https://fakestoreapi.com/products/${res}`);
  })
  .then((response) => {
    console.log(response.body.image);
    return writeFilePro(`${__dirname}/product-image.txt`, response.body.image);
  })
  .then(() => {
    console.log('Product image saved to file');
  })
  .catch((err) => {
    console.error('Error reading product file:', err);
  });
