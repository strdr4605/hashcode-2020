const fs = require("fs");

const fileName = process.argv[2];

const file = fs.readFileSync(fileName, { encoding: "ascii" });

const data = file.split("\n");
data.pop();

console.log(data);
