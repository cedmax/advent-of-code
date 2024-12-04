const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((a) => a.split(""));

const countRight = (input, [x, y]) => (input[y][x + 1] === "M" && input[y][x + 2] === "A" && input[y][x + 3] === "S" ? 1 : 0);
const countLeft = (input, [x, y]) => (input[y][x - 1] === "M" && input[y][x - 2] === "A" && input[y][x - 3] === "S" ? 1 : 0);
const countUp = (input, [x, y]) => (input[y - 1]?.[x] === "M" && input[y - 2]?.[x] === "A" && input[y - 3]?.[x] === "S" ? 1 : 0);
const countDown = (input, [x, y]) => (input[y + 1]?.[x] === "M" && input[y + 2]?.[x] === "A" && input[y + 3]?.[x] === "S" ? 1 : 0);
const countTopLeft = (input, [x, y]) => (input[y - 1]?.[x - 1] === "M" && input[y - 2]?.[x - 2] === "A" && input[y - 3]?.[x - 3] === "S" ? 1 : 0);
const countTopright = (input, [x, y]) => (input[y - 1]?.[x + 1] === "M" && input[y - 2]?.[x + 2] === "A" && input[y - 3]?.[x + 3] === "S" ? 1 : 0);
const countBottomLeft = (input, [x, y]) => (input[y + 1]?.[x - 1] === "M" && input[y + 2]?.[x - 2] === "A" && input[y + 3]?.[x - 3] === "S" ? 1 : 0);
const countBottomRight = (input, [x, y]) => (input[y + 1]?.[x + 1] === "M" && input[y + 2]?.[x + 2] === "A" && input[y + 3]?.[x + 3] === "S" ? 1 : 0);

const firstPart = input.reduce((count, line, y) => {
  line.forEach((letter, x) => {
    if (letter === "X") {
      const args = [input, [x, y]];
      count +=
        countRight(...args) +
        countLeft(...args) +
        countUp(...args) +
        countDown(...args) +
        countTopLeft(...args) +
        countTopright(...args) +
        countBottomLeft(...args) +
        countBottomRight(...args);
    }
  });
  return count;
}, 0);

console.log(firstPart);

const matchTopLeftBottomRight = (input, [x, y]) =>
  (input[y - 1]?.[x - 1] === "M" && input[y + 1]?.[x + 1] === "S") || (input[y - 1]?.[x - 1] === "S" && input[y + 1]?.[x + 1] === "M");

const matchTopRightBottomLeft = (input, [x, y]) =>
  (input[y + 1]?.[x - 1] === "M" && input[y - 1]?.[x + 1] === "S") || (input[y + 1]?.[x - 1] === "S" && input[y - 1]?.[x + 1] === "M");

const secondPart = input.reduce((count, line, y) => {
  line.forEach((letter, x) => {
    if (letter === "A" && matchTopLeftBottomRight(input, [x, y]) && matchTopRightBottomLeft(input, [x, y])) {
      count++;
    }
  });
  return count;
}, 0);

console.log(secondPart);
