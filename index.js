const fs = require('fs');
const http = require('http');
const superagent = require('superagent');

fs.readFile(`${__dirname}/product.txt`, 'utf-8', (err, data) => {
  console.log('Product: ', data);
  superagent
    .get(`https://fakestoreapi.com/products/${data}`)
    .end((err, res) => {
      if (err) {
        console.error('Error fetching product image:', err);
        return;
      }
      console.log(res.body.image);
      fs.writeFile(`${__dirname}/product-image.txt`, res.body.image, (err) => {
        if (err) {
          console.error('Error writing product image to file:', err);
        } else {
          console.log('Product image saved to product-image.txt');
        }
      });
    });
});
