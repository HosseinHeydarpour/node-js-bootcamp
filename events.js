const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    // Always call super() first in the constructor when extending a class
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("New sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Hossein");
});

myEmitter.on("newSale", (stock) => {
  console.log(`New sale! Stock left: ${stock}`);
});

// this is like clicking on a button
// We can pass data to the event listeners
myEmitter.emit("newSale", 9);

//******************

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request RECIEVED");
  console.log(req.url); // it gets executed twice one because of / and one for /favicon.ico
  res.end("Request RECIEVED");
});

server.on("request", (req, res) => {
  console.log("ANOTHER Request RECIEVED 😁");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server listening on port 8000");
});
