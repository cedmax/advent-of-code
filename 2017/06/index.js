const input = require("../../utils/getInput")(__dirname, {
  split: "\t"
}).map((i) => parseInt(i, 10));
const seen = [];
let last = [...input];

while (seen.indexOf(last.join(",")) === seen.length - 1) {
  let higher = Math.max(...last);
  let index = last.indexOf(higher);
  last[index] = 0;

  while (higher) {
    index = ++index === last.length ? 0 : index;
    last[index] = last[index] + 1;
    higher--;
  }
  console.log(last);
  seen.push(last.join(","));
}

console.log(seen.length);
console.log(seen.length - 1 - seen.indexOf(last.join(",")));
