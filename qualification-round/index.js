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
    libId: j,
    booksAmount: jBooksAmount,
    signupDays: jSignupDays,
    booksScannedPerDay: jBooksScannedPerDay,
    booksIds: jBooksIds.sort((a, b) => booksScores[a] - booksScores[b])
  });
}

// To write to file: node index.js a_example.txt > a.out

// console.log({
//   totalBooksAmount,
//   libsAmount,
//   maxDays,
//   booksScores,
//   libs
// });

// console.log("=====================================");

libs.sort((a, b) => {
  if (
    a.signupDays > b.signupDays ||
    a.booksScannedPerDay > b.booksScannedPerDay
  ) {
    return 1;
  } else {
    return -1;
  }
});

// console.log({ libs });
// process.exit(1);

const libsSignedup = [];
let libToSignup = null;

let isSingupBusy = false;
let libId = 0;

let usedBooks = {};

for (let currentDay = 0; currentDay < maxDays; currentDay++) {
  if (!isSingupBusy) {
    isSingupBusy = true;
    libToSignup = libs[libId] || null;
    if (libToSignup) {
      libsSignedup[libId] = { id: libToSignup.libId, books: [] };
    } else {
      break;
    }
  }
  if (libToSignup) {
    libToSignup.signupDays--;
    if (libToSignup.signupDays === 0) {
      isSingupBusy = false;
      libId++;
    }
  }

  libs.forEach((lib, i) => {
    if (!lib.signupDays && libsSignedup[i]) {
      lib.booksIds = lib.booksIds.filter(b => !usedBooks[b]);
      lib.booksIds.forEach(b => (usedBooks[b] = true));
      const newBooks = lib.booksIds.splice(0, lib.booksScannedPerDay);
      newBooks.forEach(b => (usedBooks[b] = true));

      libsSignedup[i].books = libsSignedup[i].books.concat(newBooks);
    }
  });
}

// console.log({ libsSignedup, usedBooks });

const filteredLibsSignedup = libsSignedup.filter(e => e.books.length);

console.log(filteredLibsSignedup.length);
filteredLibsSignedup.forEach((lib, i) => {
  console.log(`${lib.id} ${lib.books.length}`);
  console.log(lib.books.join(" "));
});
