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
  const path = [startCoords];

  while (isInBounds(path[path.length - 1])) {
    const [x, y] = path[path.length - 1];

    const { next, rotate } = getNextAction([x, y], direction);

    if (map[next[1]]?.[next[0]] === "#") {
      direction = rotate;
    } else {
      path.push(next);
    }
  }
  const unique = new Set(path.map((a) => JSON.stringify(a)));
  return unique.size - 1;
};

console.log(firstPart(input));

// I gave up: brute forcing takes ages to run and it's impossible to debug
// and I have no time to think about a more clever approach

// const checkLoop = (pathSoFar, direction, map) => {
//   const path = [...pathSoFar];
//   while (isInBounds(path[path.length - 1].next)) {
//     const {
//       next: [x, y]
//     } = path[path.length - 1];

//     const { next, rotate } = getNextAction([x, y], direction);

//     if (map[next[1]]?.[next[0]] === "#") {
//       direction = rotate;
//     } else {
//       if (path.find((a) => JSON.stringify(a.next) === JSON.stringify(next) && a.direction === direction)) {
//         return true;
//       }
//       path.push({ next, direction });
//     }
//   }
//   return false;
// };

// const secondPart = (matrix) => {
//   let direction = "^";
//   const newBlocks = [];
//   const path = [{ next: startCoords, direction: "^" }];
//   while (isInBounds(path[path.length - 1].next)) {
//     const [x, y] = path[path.length - 1].next;

//     const { next, rotate } = getNextAction([x, y], direction);

//     if (input[next[1]]?.[next[0]] === "#") {
//       direction = rotate;
//     } else {
//       path.push({ next, direction });
//     }

//     const { next: block } = getNextAction(next, direction);
//     const clonedInput = JSON.parse(JSON.stringify(matrix));
//     if (clonedInput[block[1]]?.[block[0]]) {
//       clonedInput[block[1]][block[0]] = "#";
//       if (checkLoop(path, direction, clonedInput)) {
//         newBlocks.push(block);
//         console.log(newBlocks);
//       }
//     }
//   }

//   const containsStart = !!newBlocks.find((a) => (a[0] === startCoords[0]) & (a[1] === startCoords[1]));

//   const unique = new Set(newBlocks.map((a) => JSON.stringify(a)));
//   return unique.size - (containsStart ? 1 : 0);
// };

// console.log(secondPart(input));
