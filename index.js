const fs = require("fs");
const http = require("http"); // This gives us networking capabilities

// Blocking, synchronous way

// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);

// const textOutput = `This is what we know about the avacado: ${textInput}.\nCreated on ${Date.now()}`;

// This does not return anythong meaningful
// fs.writeFileSync("./txt/output.txt", textOutput);
// console.log("FILE WRITTEN");

// ************************************************************
//  Reading and Writing Files Asynchronously
// ************************************************************

// Non-blocking, asynchronous way
// This triangle is called callback hell
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) {
//     return console.log("ERROR 😡");
//   }

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("FILE HAS BEEN WRITTEN 😁");
//       });
//     });
//   });
// });
// console.log("Will read file");

// ************************************************************
// * Creating a Simple Web Server
// ************************************************************
const server = http.createServer((req, res) => {
  // console.log(req);
  // Sending back a very simple response for a request
  res.end("REQUEST WAS SUCCESSFULL");
});

// Params: Port, Host: deafults to local host
server.listen(8000, "127.0.0.1", () => {
  console.log("Server ready and listening to requests on port 8000");
});
