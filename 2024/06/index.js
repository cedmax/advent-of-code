const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((line) => line.split(""));

// const input = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`
//   .split("\n")
//   .map((line) => line.split(""));

const startCoords = input.reduce((coords, line, y) => {
  const x = line.findIndex((l) => l === "^");
  if (x !== -1) {
    coords = [x, y];
  }
  return coords;
}, []);

const bound = {
  x: { min: -1, max: input[0].length },
  y: { min: -1, max: input.length }
};

const isInBounds = ([x, y]) => x > bound.x.min && x < bound.x.max && y > bound.y.min && y < bound.y.max;
const getNextAction = ([x, y], direction) => {
  let next, rotate;
  switch (direction) {
    case "^":
      next = [x, y - 1];
      rotate = ">";
      break;
    case ">":
      next = [x + 1, y];
      rotate = "v";
      break;
    case "v":
      next = [x, y + 1];
      rotate = "<";
      break;
    case "<":
      next = [x - 1, y];
      rotate = "^";
      break;
  }

  return {
    next,
    rotate
  };
};

const firstPart = (map) => {
  let direction = "^";
  const path = [{ pos: startCoords, direction }];

  while (isInBounds(path[path.length - 1].pos)) {
    const [x, y] = path[path.length - 1].pos;

    const { next, rotate } = getNextAction([x, y], direction);

    if (map[next[1]]?.[next[0]] === "#") {
      direction = rotate;
    } else {
      // added for part2, if we are in the same position as before and
      // about to go in the same direction, then it's a loop
      if (path.length > 1 && path.find(({ pos: [stepX, stepY], direction: stepDirection }) => stepX === next[0] && stepY === next[1] && stepDirection === direction)) {
        return [];
      }
      path.push({ pos: next, direction });
    }
  }

  path.pop();
  return Array.from(new Set(path.map((a) => JSON.stringify(a.pos)))).map((a) => JSON.parse(a));
};

const path = firstPart(input);
console.log(path.length);

// god this is slow
let loops = 0;
for (const step of path) {
  // skipping the first block as per the rules
  if (JSON.stringify(step) === JSON.stringify(startCoords)) {
    continue;
  }
  const [x, y] = step;
  const map = JSON.parse(JSON.stringify(input));
  map[y][x] = "#";
  if (firstPart(map).length === 0) {
    loops++;
  }
}

console.log(loops);
