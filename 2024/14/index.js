const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const example = `p=0,4 v=3,-3
// p=6,3 v=-1,-3
// p=10,3 v=-1,2
// p=2,0 v=2,-1
// p=0,0 v=1,3
// p=3,0 v=-2,-2
// p=7,6 v=-1,-3
// p=3,0 v=-1,-2
// p=9,3 v=2,3
// p=7,3 v=-1,2
// p=2,4 v=2,-3
// p=9,5 v=-3,-3`.split("\n");
//const gridSizes = { width: 11, height: 7 };
const gridSizes = { width: 101, height: 103 };

const parse = (input) =>
  input.map((ln) => {
    const [x, y, vx, vy] = ln.match(/-?\d+/g);

    return { x: Number(x), y: Number(y), vx: Number(vx), vy: Number(vy) };
  });

const createGrid = (list) => {
  const grid = Array.from({ length: gridSizes.height }).map(() => Array.from({ length: gridSizes.width }).map(() => "."));

  list.forEach(({ x, y }) => {
    grid[y][x] = (Number(grid[y][x]) || 0) + 1;
  });

  return grid;
};

const move = (data, movements) =>
  data.map(({ x, y, vx, vy }) => {
    x = (x + vx * movements) % gridSizes.width;
    y = (y + vy * movements) % gridSizes.height;
    if (x < 0) {
      x = gridSizes.width + x;
    }
    if (y < 0) {
      y = gridSizes.height + y;
    }
    return { x, y, vx, vy };
  });

const countQuadrant = (grid, [startY, endY], [startX, endX]) => {
  let val = 0;
  for (let lineIdx = startY; lineIdx < endY; lineIdx++) {
    for (let itemIdx = startX; itemIdx < endX; itemIdx++) {
      const item = grid[lineIdx][itemIdx];
      if (item !== ".") {
        val += Number(item);
      }
    }
  }
  return val;
};

const getValue = (grid) => {
  const [x, y] = [Math.floor(gridSizes.width / 2), Math.floor(gridSizes.height / 2)];
  const topLeft = countQuadrant(grid, [0, y], [0, x]);
  const topRight = countQuadrant(grid, [0, y], [x + 1, gridSizes.width]);
  const bottomLeft = countQuadrant(grid, [y + 1, gridSizes.height], [0, x]);
  const bottomRight = countQuadrant(grid, [y + 1, gridSizes.height], [x + 1, gridSizes.width]);
  return [topLeft, topRight, bottomLeft, bottomRight];
};

const data = parse(input);
const moved = move(data, 100);
const grid = createGrid(moved);
const values = getValue(grid);
console.log(values.reduce((acc, item) => acc * item, 1));

const printGrid = (grid) => {
  console.log(grid.map((ln) => ln.join("")).join("\n"));
};

const countUnique = (list) => {
  const grid = createGrid(list);
  const text = grid.map((ln) => ln.join("")).join("\n");
  return [...text.matchAll(/1/g)].length;
};

let newData = JSON.parse(JSON.stringify(data));

for (let i = 1; i < 10000; i++) {
  newData = move(newData, 1);

  // this was a bit trial and error, I started checking when the difference
  // was less than 10 and narrowed it down when I found the value visually
  if (newData.length === countUnique(newData)) {
    console.log("####################################", i, "####################################");
    console.log("\n");
    printGrid(createGrid(newData));
    console.log("\n");
  }
}
