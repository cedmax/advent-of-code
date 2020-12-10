const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).map((i) => parseInt(i, 10));

const deviceJolt = Math.max(...input) + 3;

let jolts = deviceJolt;
const totals = {
  ones: 0,
  threes: 0,
};

while (jolts > 0) {
  if (input.includes(jolts - 1) || jolts - 1 === 0) {
    jolts = jolts - 1;
    totals.ones = totals.ones + 1;
  } else {
    jolts = jolts - 3;
    totals.threes = totals.threes + 1;
  }
}

console.log(totals.ones * totals.threes);

const countForks = (data) =>
  data
    .reduce(
      (acc, item) => {
        // checking the 3 previous positions to find
        // the number of forks so far and sum them up
        acc[item] = [1, 2, 3]
          .map((i) => item - i)
          .reduce((total, idx) => total + (acc[idx] || 0), 0);
        return acc;
      },
      [1]
    )
    .pop();

console.log(countForks(input.sort((a, b) => a - b)));
