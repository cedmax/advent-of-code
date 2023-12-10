const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((l) => l.split(""));

// const input = `7-F7-
// .FJ|7
// SJLL7
// |F--J
// LJ.LJ`
//   .split("\n")
//   .map((l) => l.split(""));

console.log(input);

const findStart = (input) => {
  const mapped = input.map((line) => line.findIndex((c) => c === "S"));
  const y = mapped.findIndex((i) => i !== -1);
  const x = mapped[y];

  return { x, y, chr: "S" };
};

const fromStart = (input, { x, y }) => {
  if (["|", "F"].includes(input[y - 1][x])) {
    return { x, y: y - 1, chr: input[y - 1][x], from: { x, y } };
  }
  if (["-", "J"].includes(input[y][x + 1])) {
    return { x: x + 1, y, chr: input[y][x + 1], from: { x, y } };
  }
  if (["|", "J"].includes(input[y + 1][x])) {
    return { x, y: y + 1, chr: input[y + 1][x], from: { x, y } };
  }
  if (["-", "L"].includes(input[y][x - 1])) {
    return { x: x + 1, y, chr: input[y][x + 1], from: { x, y } };
  }
};

const nextMap = {
  J: (current, from) => (current.x === from.x + 1 ? { x: current.x, y: current.y - 1 } : { x: current.x - 1, y: current.y }),
  F: (current, from) => (current.y === from.y - 1 ? { x: current.x + 1, y: current.y } : { x: current.x, y: current.y + 1 }),
  7: (current, from) => (current.x === from.x + 1 ? { x: current.x, y: current.y + 1 } : { x: current.x - 1, y: current.y }),
  "|": (current, from) => (current.y === from.y + 1 ? { x: current.x, y: current.y + 1 } : { x: current.x, y: current.y - 1 }),
  L: (current, from) => (current.x === from.x - 1 ? { x: current.x, y: current.y - 1 } : { x: current.x + 1, y: current.y }),
  "-": (current, from) => (current.x === from.x + 1 ? { x: current.x + 1, y: current.y } : { x: current.x - 1, y: current.y })
};

const findNext = (input, { x, y, chr, from }) => {
  const coords = nextMap[chr]({ x, y }, from);
  return { ...coords, chr: input[coords.y][coords.x], from: { x, y } };
};

const navigate = (input, start) => {
  let next = fromStart(input, start);
  let steps = 1;
  do {
    next = findNext(input, next);
    steps++;
  } while (next.chr !== start.chr);
  return steps;
};

const start = findStart(input);
const totalDistance = navigate(input, start);
console.log(totalDistance / 2);
