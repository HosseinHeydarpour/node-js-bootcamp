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
    // 2️⃣ We throw the error to be handled in the calling function
    throw error;
  } finally {
    console.log('Finished fetching product image');
  }

  // 1️⃣ This will return a promise even if we have error so we have to use throw
  return '2: Ready 😂';
};

//
// console.log('1: Will get product image');
// getProdPic()
//   .then((res) => {
//     console.log(res);
//     console.log('3: Finished getting product image');
//   })
//   .catch((error) => {
//     // 3️⃣ We use the error thrown in the async function
//     console.error('Error:', error);
//   });

(async () => {
  try {
    console.log('1: Will get product image');
    const res = await getProdPic();
    console.log(res);
    console.log('3: Finished getting product image');
  } catch (error) {
    // 3️⃣ We use the error thrown in the async function
    console.error('Error:', error);
  }
})();
