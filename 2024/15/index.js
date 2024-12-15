const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

// this sucks

// const input = `#######
// #...#.#
// #.....#
// #..OO@#
// #..O..#
// #.....#
// #######

// <vv<<^^<<^^`.split("\n\n");

const parse = (data) => {
  const [gridStr, instrStr] = data;
  return { grid: gridStr.split("\n").map((ln) => ln.split("")), instr: instrStr.replace(/\n/g, "").split("") };
};

const printableGrid = (grid) => {
  return grid.map((ln) => ln.join("")).join("\n");
};

let { grid, instr } = parse(input);

const move = () => {};

let currentCoord = grid.reduce((coords, ln, y) => {
  const x = ln.findIndex((item) => item === "@");
  if (x > -1) coords = [x, y];
  return coords;
});

// console.log("Initial state:");
// console.log(printableGrid(grid), "\n");

const shiftItems = (grid, [x, y], op) => {
  const movement = [">", "v"].includes(op) ? 1 : -1;

  let cursor = { x, y };
  let newCoord = [x, y];
  if (["<", ">"].includes(op)) {
    while (!["#", "."].includes(grid[y][cursor.x])) {
      cursor = { x: cursor.x + movement, y };
    }
    if (grid[y][cursor.x] === ".") {
      while (cursor.x !== x) {
        const oldCursorX = cursor.x;
        cursor.x = cursor.x - movement;
        grid[y][oldCursorX] = grid[y][cursor.x];
      }
      grid[y][x] = ".";
      newCoord = [x + movement, y];
    }
  } else {
    while (!["#", "."].includes(grid[cursor.y][x])) {
      cursor = { x, y: cursor.y + movement };
    }
    if (grid[cursor.y][x] === ".") {
      while (cursor.y !== y) {
        const oldCursorY = cursor.y;
        cursor.y = cursor.y - movement;
        grid[oldCursorY][x] = grid[cursor.y][x];
      }
      grid[y][x] = ".";
      newCoord = [x, y + movement];
    }
  }

  return {
    updatedGrid: grid,
    coord: newCoord
  };
};

while ((op = instr.shift())) {
  const { updatedGrid, coord } = shiftItems(grid, currentCoord, op);
  grid = updatedGrid;
  currentCoord = coord;
}

const result = grid.reduce((acc, ln, y) => {
  return (
    acc +
    ln.reduce((acc, item, x) => {
      return acc + (item === "O" ? 100 * y + x : 0);
    }, 0)
  );
}, 0);

console.log(result);

/**
 * This is the beginning of the second part, but
 * I can't think of a swift way to do it now and
 * I might or might not pick it up later
 */

// const double = parse(input).grid.map((ln) =>
//   ln
//     .map((item) => {
//       if (item === "#") return ["#", "#"];
//       if (item === "O") return ["[", "]"];
//       if (item === "@") return ["@", "."];
//       if (item === ".") return [".", "."];
//     })
//     .flat()
// );

//console.log(printableGrid(double));
