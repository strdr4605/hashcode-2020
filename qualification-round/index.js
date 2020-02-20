const fs = require("fs");

const fileName = process.argv[2];

const file = fs.readFileSync(fileName, { encoding: "ascii" });

const data = file.split("\n");
data.pop();

// Read data

const [totalBooksAmount, libsAmount, maxDays] = data
  .shift()
  .split(" ")
  .map(e => +e);
const booksScores = data
  .shift()
  .split(" ")
  .map(e => +e);

const libs = [];

for (let j = 0; j < libsAmount; j++) {
  const [jBooksAmount, jSignupDays, jBooksScannedPerDay] = data
    .shift()
    .split(" ")
    .map(e => +e);
  const jBooksIds = data
    .shift()
    .split(" ")
    .map(e => +e);
  libs.push({
    booksAmount: jBooksAmount,
    signupDays: jSignupDays,
    booksScannedPerDay: jBooksScannedPerDay,
    booksIds: jBooksIds
  });
}

// To write to file: node index.js a_example.txt > a.out

console.log({
  totalBooksAmount,
  libsAmount,
  maxDays,
  booksScores,
  libs
});
