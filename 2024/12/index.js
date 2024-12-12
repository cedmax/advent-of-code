const input = require("../../utils/getInput")(__dirname, { split: null });

// const example1 = `AAAA
// BBCD
// BBCC
// EEEC`;

// const example2 = `OOOOO
// OXOXO
// OOOOO
// OXOXO
// OOOOO`;

// const example3 = `RRRRIICCFF
// RRRRIICCCF
// VVRRRCCFFF
// VVRCCCJFFF
// VVVVCJJCFE
// VVIVCCJJEE
// VVIIICJJEE
// MIIIIIJJEE
// MIIISIJEEE
// MMMISSJEEE`;

// const example4 = `EEEEE
// EXXXX
// EEEEE
// EXXXX
// EEEEE`;

const grid = input.split("\n").map((a) => a.split(""));

const returnObj = (grid, [x, y]) => ({
  coords: [x, y],
  val: grid[y]?.[x]
});

const getTop = (grid, [x, y]) => returnObj(grid, [x, y - 1]);
const getBottom = (grid, [x, y]) => returnObj(grid, [x, y + 1]);
const getLeft = (grid, [x, y]) => returnObj(grid, [x - 1, y]);
const getRight = (grid, [x, y]) => returnObj(grid, [x + 1, y]);
const getTopLeft = (grid, [x, y]) => returnObj(grid, [x - 1, y - 1]);
const getBottomLeft = (grid, [x, y]) => returnObj(grid, [x - 1, y + 1]);
const getTopRight = (grid, [x, y]) => returnObj(grid, [x + 1, y - 1]);
const getBottomRight = (grid, [x, y]) => returnObj(grid, [x + 1, y + 1]);

const getSides = (...args) => [getTop(...args), getBottom(...args), getLeft(...args), getRight(...args)];
const compareCoords = (coord1, coord2) => JSON.stringify(coord1) === JSON.stringify(coord2);
const compareValues = (grid, [x1, y1], [x2, y2]) => grid[y1]?.[x1] === grid[y2][x2];

// ok, this sucks, but it works pretty well, sooooo....
const countCorners = (grid, { coords: [x, y], val }, sides) => {
  let corners = 0;
  const [top, bottom, left, right] = sides;

  if (top.val !== val && left.val !== val) {
    corners++;
  }
  if (bottom.val !== val && left.val !== val) {
    corners++;
  }
  if (top.val !== val && right.val !== val) {
    corners++;
  }
  if (bottom.val !== val && right.val !== val) {
    corners++;
  }

  if (top.val === val && left.val === val && getTopLeft(grid, [x, y]).val !== val) {
    corners++;
  }
  if (bottom.val === val && left.val === val && getBottomLeft(grid, [x, y]).val !== val) {
    corners++;
  }
  if (top.val === val && right.val === val && getTopRight(grid, [x, y]).val !== val) {
    corners++;
  }
  if (bottom.val == val && right.val === val && getBottomRight(grid, [x, y]).val !== val) {
    corners++;
  }

  return corners;
};

const getAreaDimensions = (grid, [x, y], area = []) => {
  if (area.find((item) => compareCoords(item.coords, [x, y]))) return;

  const sides = getSides(grid, [x, y]);
  const perimeterLength = sides.filter((side) => !compareValues(grid, side.coords, [x, y])).length;
  const corners = countCorners(grid, { coords: [x, y], val: grid[y][x] }, sides);

  const partOfArea = sides.filter((side) => compareValues(grid, side.coords, [x, y]));

  area.push({ coords: [x, y], corners, perimeterLength, val: grid[y][x] });
  partOfArea.forEach((item) => getAreaDimensions(grid, item.coords, area));

  return area.flat().filter((a) => a);
};

const getAreas = (grid, areas) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== ".") {
        const area = getAreaDimensions(grid, [x, y]);
        areas.push(area);
        area.forEach(({ coords: [x, y] }) => (grid[y][x] = "."));
      }
    }
  }

  return areas;
};

const areas = getAreas(grid, []);
const firstPart = areas.reduce((total, area) => {
  const areaPerimeter = area.reduce((acc, { perimeterLength }) => acc + perimeterLength, 0);

  return (total += areaPerimeter * area.length);
}, 0);

console.log(firstPart);

const secondPart = areas.reduce((total, area) => {
  const areaPerimeter = area.reduce((acc, { corners }) => acc + corners, 0);

  return (total += areaPerimeter * area.length);
}, 0);

console.log(secondPart);
