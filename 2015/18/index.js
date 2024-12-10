const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map(
  (l) => l.split("")
);

const isOn = (val) => val === "#";

const getOnNearby = (grid, [x, y]) =>
  [
    grid[y - 1]?.[x],
    grid[y + 1]?.[x],
    grid[y]?.[x - 1],
    grid[y]?.[x + 1],
    grid[y - 1]?.[x + 1],
    grid[y - 1]?.[x - 1],
    grid[y + 1]?.[x + 1],
    grid[y + 1]?.[x - 1],
  ].filter(isOn);

let grid = JSON.parse(JSON.stringify(input));

const operateLights = (grid, ref, [x, y]) => {
  const nearby = getOnNearby(ref, [x, y]);
  if (isOn(ref[y][x]) && ![2, 3].includes(nearby.length)) {
    grid[y][x] = ".";
  }
  if (!isOn(ref[y][x]) && nearby.length === 3) {
    grid[y][x] = "#";
  }
};

for (let i = 0; i < 100; i++) {
  let ref = JSON.parse(JSON.stringify(grid));
  ref.forEach((line, y) => {
    line.forEach((_, x) => {
      operateLights(grid, ref, [x, y]);
    });
  });
}

console.log(
  JSON.stringify(grid)
    .split("")
    .filter((a) => isOn(a)).length
);

const isCorner = (grid, [x, y]) =>
  (x === 0 && y === 0) ||
  (x === 0 && y === grid.length - 1) ||
  (x === grid[0].length - 1 && y === 0) ||
  (x === grid[0].length - 1 && y === grid.length - 1);

grid = JSON.parse(JSON.stringify(input));
grid[0][0] = "#";
grid[0][grid[0].length - 1] = "#";
grid[grid.length - 1][0] = "#";
grid[grid.length - 1][grid[0].length - 1] = "#";

for (let i = 0; i < 100; i++) {
  let ref = JSON.parse(JSON.stringify(grid));
  ref.forEach((line, y) => {
    line.forEach((_, x) => {
      if (!isCorner(ref, [x, y])) {
        operateLights(grid, ref, [x, y]);
      }
    });
  });
}

console.log(
  JSON.stringify(grid)
    .split("")
    .filter((a) => isOn(a)).length
);
