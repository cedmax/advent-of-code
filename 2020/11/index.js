const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).map((line) => line.split(""));

const checkAround = (input, clone, y, x, callback) => {
  const cache = [];
  const posToCheck = [-1, 0, +1];
  posToCheck.forEach((addY) => {
    posToCheck.forEach((addX) => {
      if (addX !== 0 || addY !== 0) {
        cache.push(input[y + addY] && input[y + addY][x + addX]);
      }
    });
  });
  const totalOccupied = cache.filter((item) => item === "#").length;
  clone[y][x] = callback(totalOccupied);
  return clone;
};

const cloneArrayofArrays = (arr) => JSON.parse(JSON.stringify(arr));

const parse = (arr, checkFunction, acceptableThreshold) => {
  let changes;
  let input = cloneArrayofArrays(arr);
  let clone = cloneArrayofArrays(arr);

  while (changes !== 0) {
    changes = 0;
    input.forEach((row, rowIdx) => {
      row.forEach((item, itemIdx) => {
        if (item === "L") {
          clone = checkFunction(input, clone, rowIdx, itemIdx, (len) => {
            if (len === 0) {
              changes++;
              return "#";
            }
            return "L";
          });
        }
        if (item === "#") {
          clone = checkFunction(input, clone, rowIdx, itemIdx, (len) => {
            if (len > acceptableThreshold - 1) {
              changes++;
              return "L";
            }
            return "#";
          });
        }
      });
    });
    input = cloneArrayofArrays(clone);
    clone = cloneArrayofArrays(input);
  }

  return clone;
};

console.log(
  parse(input, checkAround, 4)
    .reduce((a, b) => a.concat(b), [])
    .filter((i) => i === "#").length
);

const find = (input, positions) =>
  positions
    .map(([y, x]) => input[y][x])
    .find((item) => ["L", "#"].includes(item));

// I'm honestly ashamed of myself 😂
const checkLineOfSight = (input, clone, y, x, callback) => {
  const topCoords = find(
    input,
    [...new Array(y)].map((n, i) => [y - i - 1, x]).filter(([y, x]) => y >= 0)
  );

  const bottomCoords = find(
    input,
    [...new Array(input.length - y - 1)]
      .map((n, i) => [input.length - 1 - i, x])
      .reverse()
  );

  const leftCoords = find(
    input,
    [...new Array(x)].map((n, i) => [y, x - 1 - i]).filter(([y, x]) => x >= 0)
  );

  const rightCoords = find(
    input,
    [...new Array(input[y].length - x - 1)]
      .map((n, i) => [y, input[y].length - 1 - i])
      .reverse()
  );

  const topLeftCoords = find(
    input,
    [...new Array(y)]
      .map((n, i) => [y - 1 - i, x - 1 - i])
      .filter(([y, x]) => x >= 0 && y >= 0)
  );

  const topRightCoords = find(
    input,
    [...new Array(y)]
      .map((n, i) => [y - i - 1, x + i + 1])
      .filter(([y, x]) => x < input[y].length && y >= 0)
  );

  const bottomLeftCoords = find(
    input,
    [...new Array(input.length - y - 1)]
      .map((n, i) => [y + 1 + i, x - 1 - i])
      .filter(([y, x]) => x >= 0 && y >= 0)
  );

  const bottomRightCoords = find(
    input,
    [...new Array(input.length - y - 1)]
      .map((n, i) => [y + 1 + i, x + i + 1])
      .filter(([y, x]) => x < input[y].length && y >= 0)
  );

  const cache = [
    topCoords,
    bottomCoords,
    leftCoords,
    rightCoords,
    topLeftCoords,
    topRightCoords,
    bottomLeftCoords,
    bottomRightCoords,
  ];

  const totalOccupied = cache.filter((item) => item === "#").length;

  clone[y][x] = callback(totalOccupied);
  return clone;
};

console.log(
  parse(input, checkLineOfSight, 5)
    .reduce((a, b) => a.concat(b), [])
    .filter((i) => i === "#").length
);
