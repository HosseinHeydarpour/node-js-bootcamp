const fs = require("fs");

const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textInput);

const textOutput = `This is what we know about the avacado: ${textInput}.\nCreated on ${Date.now()}`;

// This does not return anythong meaningful
fs.writeFileSync("./txt/output.txt", textOutput);
console.log("FILE WRITTEN");
