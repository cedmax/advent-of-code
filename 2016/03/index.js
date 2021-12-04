const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((line) => line.trim().split(/\s+/g).map(Number));

const result = input
  .map((data) => {
    data = [...data].sort((a, b) => b - a);
    const highest = data.shift();
    const others = data.reduce((a, b) => a + b);

    return highest < others;
  })
  .filter((a) => !!a).length;

console.log(result);
