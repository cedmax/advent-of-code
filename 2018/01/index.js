const operations = require("../../utils/getInput")(__dirname, { split: "\n" });
//const input = `+7, +7, -2, -7, -4`.replace(/, /g, "\n");

const result = operations.reduce((acc, item) => {
  acc = eval(`${acc} + ${item}`);
  return acc;
}, 0);

console.log(result);
let looping = true;
let incrementalResults = [];
let reducerValue = 0;
while (looping) {
  reducerValue = operations.reduce((acc, item, i, arr) => {
    if (incrementalResults.includes(acc)) {
      console.log(acc);
      looping = !arr.splice(1);
    } else {
      incrementalResults.push(acc);
      acc = eval(`${acc} + ${item}`);
      return acc;
    }
  }, reducerValue);
}
