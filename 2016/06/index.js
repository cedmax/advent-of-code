const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((i) => i.split(""));

const results = input.reduce((acc, line) => {
  line.forEach((l, p) => {
    if (!acc[p]) {
      acc[p] = {};
    }
    acc[p][l] = (acc[p][l] || 0) + 1;
  });

  return acc;
}, []);

const getResult = (condition) =>
  results
    .map((line) => Object.entries(line).reduce((a, b) => (condition(a, b) ? a : b)), 0)
    .map((i) => i[0])
    .join("");

console.log(getResult((a, b) => a[1] > b[1]));
console.log(getResult((a, b) => a[1] < b[1]));
