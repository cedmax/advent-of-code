const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).map((line) => line.split(""));

const totalLines = input.length - 1;

const calculate = (increment) => {
  const positions = [[0, 0]];

  while (positions[positions.length - 1][1] !== totalLines) {
    const currentPos = positions[positions.length - 1];
    const newPos = [currentPos[0] + increment[0], currentPos[1] + increment[1]];
    positions.push(newPos);
  }

  const result = positions.reduce((tot, [x, y]) => {
    const line = input[y];
    const lastPos = line.length - 1;
    const newX = x <= lastPos ? x : x % line.length;

    if (input[y][newX] === "#") {
      tot = tot + 1;
    }
    return tot;
  }, 0);
  return result;
};
console.log(calculate([3, 1]));

console.log(
  [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ].reduce((acc, inc) => {
    return acc * calculate(inc);
  }, 1)
);
