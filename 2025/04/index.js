const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const parseInput = (input) => input.map((l) => l.split(""));

const grid = parseInput(input);

const getAdjacent = (grid, { x, y }) => {
  if (grid[y][x] === ".") return;
  const n = y - 1;
  const s = y + 1;
  const e = x + 1;
  const w = x - 1;

  return [grid?.[n]?.[x], grid?.[s]?.[x], grid?.[y]?.[e], grid?.[y]?.[w], grid?.[n]?.[e], grid?.[s]?.[e], grid?.[n]?.[w], grid?.[s]?.[w]];
};

const part1 = grid.reduce(
  (count, line, y) =>
    line.reduce((count, _, x) => {
      const adjacent = getAdjacent(grid, { x, y });
      if (adjacent && adjacent.filter((item) => item === "@").length < 4) {
        count++;
      }
      return count;
    }, count),
  0
);

console.log(part1);

let part2 = 0;
let toBeRemoved;

do {
  toBeRemoved = [];
  part2 += grid.reduce(
    (count, line, y) =>
      line.reduce((count, _, x) => {
        const adjacent = getAdjacent(grid, { x, y });
        if (adjacent && adjacent.filter((item) => item === "@").length < 4) {
          toBeRemoved.push({ x, y });
          count++;
        }
        return count;
      }, count),
    0
  );

  toBeRemoved.forEach(({ x, y }) => {
    grid[y][x] = ".";
  });
} while (toBeRemoved.length);

console.log(part2);
