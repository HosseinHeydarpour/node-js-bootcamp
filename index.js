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
// readFilePro(`${__dirname}/product.txt`)
//   .then((res) => {
//     console.log('Product ID:', res);
//     return superagent.get(`https://fakestoreapi.com/products/${res}`);
//   })
//   .then((response) => {
//     console.log(response.body.image);
//     return writeFilePro(`${__dirname}/product-image.txt`, response.body.image);
//   })
//   .then(() => {
//     console.log('Product image saved to file');
//   })
//   .catch((err) => {
//     console.error('Error reading product file:', err);
//   });

// We can only use await in an async function
// Async function always returns a promise
// Syntactic sugar for promises
const getProdPic = async () => {
  try {
    const productId = await readFilePro(`${__dirname}/product.txt`);
    console.log('Product ID:', productId);
    const response = await superagent.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    console.log(response.body.image);
    await writeFilePro(`${__dirname}/product-image.txt`, response.body.image);
    console.log('Product image saved to file');
  } catch (error) {
    console.error('Error fetching product image:', error);
  } finally {
    console.log('Finished fetching product image');
  }
};

getProdPic();
