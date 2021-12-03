const input = require("../../utils/getInput")(__dirname, { split: "" });

const inputArray = input.map((i) => parseInt(i, 10));
const length = inputArray.length;

console.log(inputArray.reduce((acc, val, idx) => ((inputArray[idx + 1] || inputArray[0]) === val ? acc + val : acc), 0));

const halfWay = length / 2;
const firstHalf = inputArray.splice(0, halfWay);
console.log(
  firstHalf.reduce((acc, val, idx) => {
    return inputArray[idx] === val ? acc + val : acc;
  }, 0) * 2
);
