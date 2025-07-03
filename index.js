const fs = require("fs");
const http = require("http"); // This gives us networking capabilities
const url = require("url");
// . means the current location of the module
const replaceTemplate = require("./modules/replaceTemplate");

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
// const server = http.createServer((req, res) => {
//   // console.log(req);
//   // Sending back a very simple response for a request
//   res.end("REQUEST WAS SUCCESSFULL");
// });

// // Params: Port, Host: deafults to local host
// server.listen(8000, "127.0.0.1", () => {
//   console.log("Server ready and listening to requests on port 8000");
// });

// ************************************************************
// * Routing
// ************************************************************

// const server = http.createServer((req, res) => {
//   console.log(req.url);

//   const pathName = req.url;

//   // If the path is / or overview
//   if (pathName === "/overview" || pathName === "/") {
//     // Sending back a very simple response for a request

//     res.end("This is the overview");
//   } else if (pathName === "/product") {
//     res.end("This is the product");
//   } else {
//     // We MUST always set these like status code, header and etc BEFORE sending the response
//     res.writeHead(404, {
//       "content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>PAGE NOT FOUND!</h1>");
//   }
// });

// // Params: Port, Host: deafults to local host
// server.listen(8000, "127.0.0.1", () => {
//   console.log("Server ready and listening to requests on port 8000");
// });

// ************************************************************
// * Building a (Very) Simple API
// ************************************************************
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObject = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   console.log(req.url);

//   const pathName = req.url;

//   // If the path is / or overview
//   if (pathName === "/overview" || pathName === "/") {
//     // Sending back a very simple response for a request

//     res.end("This is the overview");
//   } else if (pathName === "/product") {
//     res.end("This is the product");
//   } else if (pathName === "/api") {
//     // This is inefficient
//     // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
//       //   const productData = JSON.parse(data);
//       //   console.log(productData);
//       //   res.writeHead(200, {
//         //     "content-type": "application/json",
//         //   });
//         //   res.end(data);
//         // });

//         res.writeHead(200, {
//           "content-type": "application/json",
//         });
//         res.end(data);
//       } else {
//         // We MUST always set these like status code, header and etc BEFORE sending the response
//         res.writeHead(404, {
//           "content-type": "text/html",
//           "my-own-header": "hello-world",
//         });
//         res.end("<h1>PAGE NOT FOUND!</h1>");
//       }
//     });

//     // Params: Port, Host: deafults to local host
//     server.listen(8000, "127.0.0.1", () => {
//       console.log("Server ready and listening to requests on port 8000");
//     });

// ************************************************************
// * HTML Templating: Filling the Templates
// ************************************************************

// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);

//   if (!product.organic) {
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   }
//   output = output.replace(/{%ID%}/g, product.id);

//   return output;
// };

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObject = JSON.parse(data);

// // Because we are in the top level code and it only gets executed once we use SYNC version
// const tempOverview = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   "utf-8"
// );
// const tempCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   "utf-8"
// );
// const tempProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   "utf-8"
// );

// const server = http.createServer((req, res) => {
//   console.log(req.url);

//   const pathName = req.url;

//   // Overview Page
//   // If the path is / or overview
//   if (pathName === "/overview" || pathName === "/") {
//     // Sending back a very simple response for a request

//     res.writeHead(200, {
//       "content-type": "text/html",
//     });

//     const cardsHtml = dataObject
//       .map((el) => replaceTemplate(tempCard, el))
//       .join("");

//     output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

//     res.end(output);
//   }

//   // Product Page
//   else if (pathName === "/product") {
//     res.end("This is the product");
//   }

//   // API
//   else if (pathName === "/api") {
//     // This is inefficient
//     // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
//     //   const productData = JSON.parse(data);
//     //   console.log(productData);
//     //   res.writeHead(200, {
//     //     "content-type": "application/json",
//     //   });
//     //   res.end(data);
//     // });

//     res.writeHead(200, {
//       "content-type": "application/json",
//     });
//     res.end(data);
//   }

//   // Not Found
//   else {
//     // We MUST always set these like status code, header and etc BEFORE sending the response
//     res.writeHead(404, {
//       "content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>PAGE NOT FOUND!</h1>");
//   }
// });

// // Params: Port, Host: deafults to local host
// server.listen(8000, "127.0.0.1", () => {
//   console.log("Server ready and listening to requests on port 8000");
// });

// ************************************************************
// * Parsing Variables from URLs
// ************************************************************

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

// Because we are in the top level code and it only gets executed once we use SYNC version
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  // Destructure query and pathName
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  // If the path is / or overview
  if (pathname === "/overview" || pathname === "/") {
    // Sending back a very simple response for a request

    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(output);
  }

  // Product Page
  else if (pathname === "/product") {
    const product = dataObject[query.id];

    res.writeHead(200, {
      "content-type": "text/html",
    });

    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }

  // API
  else if (pathname === "/api") {
    // This is inefficient
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   console.log(productData);
    //   res.writeHead(200, {
    //     "content-type": "application/json",
    //   });
    //   res.end(data);
    // });

    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }

  // Not Found
  else {
    // We MUST always set these like status code, header and etc BEFORE sending the response
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>PAGE NOT FOUND!</h1>");
  }
});

// Params: Port, Host: deafults to local host
server.listen(8000, "127.0.0.1", () => {
  console.log("Server ready and listening to requests on port 8000");
});
