const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => {
  console.log("Timeout 1 executed");
}, 0);
setImmediate(() => {
  console.log("Immediate 1 executed");
});

fs.readFile("test-file.txt", "utf-8", (err, data) => {
  console.log("I/O finished");
  console.log("-----------------");

  setTimeout(() => {
    console.log("Timeout 2 executed");
  }, 0);
  setTimeout(() => {
    console.log("Timeout 3 executed");
  }, 3000);
  setImmediate(() => {
    console.log("Immediate 2 executed");
  });

  process.nextTick(() => console.log("Next tick 1 executed"));

  // Thread pool

  // BLOCKING(Very bad not inside event loop)
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "Password encrypted");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "Password encrypted");
  // });
  // crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //   console.log(Date.now() - start, "Password encrypted");
  // });
});

console.log("Hello from top-level code");
