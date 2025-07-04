//  We can use the arguments object to access all the arguments passed to a function
// console.log(arguments);
//  We can use the require function to import modules and this is the wrapper [
//  '(function (exports, require, module, __filename, __dirname) { ',
//  '\n});'
//]
// console.log(require("module").wrapper);

// Module.exports
const C = require("./test-module-1"); // We have to use ./

const calc1 = new C();
console.log(calc1.add(2, 3));
console.log(calc1.subtract(2, 7));

// Exports
// const calc2 = require("./test-module-2");
// const { add, multiply, divide } = require("./test-module-2");
const { add, multiply } = require("./test-module-2");
console.log(add(2, 3));
console.log(multiply(2, 3));
// console.log(divide(2, 3));

// Caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
/* Output
  Hello from the module(Only one because of caching)
  LOG this text ☺      
  LOG this text ☺ (These became form cache)
  LOG this text ☺ (These became form cache)
*/
