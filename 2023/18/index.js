const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `R 6 (#70c710)
// D 5 (#0dc571)
// L 2 (#5713f0)
// D 2 (#d2c081)
// R 2 (#59c680)
// D 2 (#411b91)
// L 5 (#8ceee2)
// U 2 (#caa173)
// L 1 (#1b58a2)
// U 2 (#caa171)
// R 2 (#7807d2)
// U 3 (#a77fa3)
// L 2 (#015232)
// U 2 (#7a21e3)`.split("\n");

const getMatches = (a, re) => Array.from(a.matchAll(re)).map(({ groups }) => ({ ...groups }));

const getNext = ([x, y], { dir, steps }) => {
  if (dir === "U") return [x, y - Number(steps)];
  if (dir === "D") return [x, y + Number(steps)];
  if (dir === "L") return [x - Number(steps), y];
  if (dir === "R") return [x + Number(steps), y];
};

const regEx = /(?<dir>[A-Z]) (?<steps>\d+) \((?<color>.+)\)/g;
const findEdges = (input) => {
  let perimeter = 0;
  const edges = [[0, 0]];
  input.forEach((line) => {
    const data = getMatches(line, regEx)[0];
    perimeter += Number(data.steps);
    edges.push(getNext(edges[edges.length - 1], data));
  });

  return { edges, perimeter };
};

// TIL https://en.wikipedia.org/wiki/Shoelace_formula
// Implementation from: https://www.geeksforgeeks.org/area-of-a-polygon-with-given-n-ordered-vertices/
function polygonArea(xs, ys) {
  let area = 0;
  l = xs.length;

  // Calculate value of shoelace formula
  let j = l - 1;
  for (let i = 0; i < l; i++) {
    area += (xs[j] + xs[i]) * (ys[j] - ys[i]);
    j = i;
  }

  return Math.abs(area / 2);
}
const { edges, perimeter } = findEdges(input);

// TIL https://en.wikipedia.org/wiki/Pick%27s_theorem
const area =
  polygonArea(
    edges.map(([x, y]) => x),
    edges.map(([x, y]) => y)
  ) +
  perimeter / 2 +
  1;

console.log(area);

const getNextHex = ([x, y], { dir, steps }) => {
  if (dir === "3") return [x, y - Number(steps)];
  if (dir === "1") return [x, y + Number(steps)];
  if (dir === "2") return [x - Number(steps), y];
  if (dir === "0") return [x + Number(steps), y];
};

const findHexEdges = (input) => {
  let perimeter = 0;
  const edges = [[0, 0]];
  input.forEach((line) => {
    const { color } = getMatches(line, regEx)[0];
    const data = color.slice(1).split("");
    const dir = data.pop();
    const steps = parseInt(data.join(""), 16);

    perimeter += Number(steps);
    edges.push(getNextHex(edges[edges.length - 1], { dir, steps }));
  });

  return { edges, perimeter };
};

const { edges: hexEdges, perimeter: hexPerimeter } = findHexEdges(input);

const hexArea =
  polygonArea(
    hexEdges.map(([x, y]) => x),
    hexEdges.map(([x, y]) => y)
  ) +
  hexPerimeter / 2 +
  1;

console.log(hexArea);
