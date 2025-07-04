// More elegant way
module.exports = class {
  add(a, b) {
    return a + b;
  }
  subtract(a, b) {
    return a - b;
  }
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    return a / b;
  }
  power(a, b) {
    return Math.pow(a, b);
  }
};

// Export one single value
// module.exports = Calculator;
