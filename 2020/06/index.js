const input = require("../../utils/getInput")(__dirname, {
  split: "\n\n",
}).map((line) => line.split("\n").map((str) => str.split("")));

console.log(
  input
    .map((group) => [
      ...new Set(group.reduce((acc, arr) => acc.concat(arr), [])),
    ])
    .map((i) => i.length)
    .reduce((a, b) => a + b, 0)
);

const intersection = (arr, ...args) =>
  arr.filter((item) => args.every((arr) => arr.includes(item)));

console.log(
  input
    .map((group) => [...new Set(intersection(...group))])
    .map((i) => i.length)
    .reduce((a, b) => a + b, 0)
);
