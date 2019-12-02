const fs = require("fs");
const data = fs
  .readFileSync("./input.txt", "UTF-8")
  .split("\n")
  .map(a => parseInt(a, 10));

const getFuel = item => Math.floor(item / 3) - 2;

let result = data.reduce((acc, item) => {
  acc += getFuel(item);
  return acc;
}, 0);

console.log(result);

result = data.reduce((acc, item) => {
  const value = getFuel(item);
  let extraFuelTotal = 0;
  let extraFuel = getFuel(value);
  while (extraFuel > 0) {
    extraFuelTotal += extraFuel;
    extraFuel = getFuel(extraFuel);
  }
  acc += value + extraFuelTotal;

  return acc;
}, 0);

console.log(result);
