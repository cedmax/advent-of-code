const assert = require("node:assert");
const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const example = `1=-0-2,1747
12111,906
2=0=,198
21,11
2=01,201
111,31
20012,1257
112,32
1=-1=,353
1-12,107
12,7
1=,3
122,37`;

const snafuToDec = (snafu) => {
  const digits = snafu.split("").map((i) => (i === "=" && -2) || (i === "-" && -1) || parseInt(i, 10));
  let total = 0;

  while (digits.length) {
    const digit = digits.shift();
    const power = digits.length;
    total += digit * Math.pow(5, power);
  }

  return total;
};

example
  .split("\n")
  .map((i) => i.split(","))
  .forEach(([snafu, decimal]) => {
    assert.equal(snafuToDec(snafu), parseInt(decimal, 10));
  });

function breakDown(value) {
  if (!value) return "";

  const mod = value % 5;
  const floored = Math.floor(value / 5);

  if (mod < 3) {
    return breakDown(floored) + `${mod}`;
  }

  if (mod == 3) {
    return breakDown(floored + 1) + "=";
  }

  return breakDown(floored + 1) + "-";
}

function decToSnafu(value) {
  if (!value) return "0";

  return breakDown(value);
}

example
  .split("\n")
  .map((i) => i.split(","))
  .forEach(([snafu, decimal]) => {
    assert.equal(decToSnafu(parseInt(decimal, 10)), snafu);
  });

const result = input.reduce((acc, snafu) => {
  acc += snafuToDec(snafu);
  return acc;
}, 0);

console.log(decToSnafu(result));
