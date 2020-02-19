const fs = require("fs");

// Read data from file

const fileName = process.argv[2];

const file = fs.readFileSync(fileName, { encoding: "ascii" });

const data = file.split("\n");
data.pop();

// Start algorithm

const [maxSlices, typesAmount] = data
  .shift()
  .split(" ")
  .map(e => +e);

const types = data
  .shift()
  .split(" ")
  .map(e => +e);

let typesOrdered = 0;
const orderedTypesIndexes = [];

let i = typesAmount - 1;
let currentSlices = maxSlices;

while (i > -1) {
  if (currentSlices - types[i] >= 0) {
    orderedTypesIndexes.unshift(i);
    currentSlices -= types[i];
    typesOrdered++;
  }

  i--;
}

// To write to file: node index.js a_example.in > a.out

console.log(typesOrdered);
console.log(orderedTypesIndexes.join(" "));
