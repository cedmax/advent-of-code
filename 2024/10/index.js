const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const lineLen = input[0].length;
const findAllIndexes = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

const startingPoints = findAllIndexes(input.join("").split(""), "0").map((index) => {
  const y = Math.floor(index / lineLen);
  const x = index - y * lineLen;
  return [x, y];
});

const grid = input.map((ln) => ln.split("").map(Number));

const getTop = (grid, [x, y]) => grid[y - 1]?.[x] === grid[y][x] + 1 && [x, y - 1];
const getBottom = (grid, [x, y]) => grid[y + 1]?.[x] === grid[y][x] + 1 && [x, y + 1];
const getLeft = (grid, [x, y]) => grid[y]?.[x - 1] === grid[y][x] + 1 && [x - 1, y];
const getRight = (grid, [x, y]) => grid[y]?.[x + 1] === grid[y][x] + 1 && [x + 1, y];

const getAll = (...args) => [getTop(...args), getBottom(...args), getLeft(...args), getRight(...args)].filter((a) => a);

const getResults = ({ unique }) =>
  startingPoints.reduce((res, [x, y]) => {
    let paths = getAll(grid, [x, y], grid[y][x]);

    for (let i = 0; i < 8; i++) {
      paths = paths.flatMap(([x, y]) => getAll(grid, [x, y], grid[y][x]));
    }

    if (unique) {
      paths = [...new Set(paths.map((p) => JSON.stringify(p)))];
    }

    return res + paths.length;
  }, 0);

console.log(getResults({ unique: true }));
console.log(getResults({ unique: false }));
