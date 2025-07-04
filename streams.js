const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1: file is really big and this solution does not work
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     res.writeHead(500);
  //     res.end("Internal Server Error");
  //     return;
  //   }
  //   res.end(data);
  // });

  // Solution 2: Streams
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => {
  //   // Response is a writable stream
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });

  // Solution 3: fix backpressure
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writable destination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server listening on port 8000");
});
