const data = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).map((a) => parseInt(a, 10));

const getFuel = (item) => Math.floor(item / 3) - 2;

const getExtraFuel = (value) => {
  let extraFuelTotal = value;
  let extraFuel = getFuel(value);
  while (extraFuel > 0) {
    extraFuelTotal += extraFuel;
    extraFuel = getFuel(extraFuel);
  }

  return extraFuelTotal;
};

const results = data.reduce(
  ([f, ef], item) => {
    const value = getFuel(item);
    return [f + value, ef + getExtraFuel(value)];
  },
  [0, 0]
);

console.log(results);
