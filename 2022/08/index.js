const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((l) => l.split("").map((n) => parseInt(n, 10)));

const findHigher = (input, [x, y], highest, set) => {
  const n = input[x][y];
  if (n > highest) {
    highest = n;
    set.add(`${x}_${y}`);
  }
  return [highest, set];
};

const visibleTrees = (input) => {
  let cache = new Set();

  for (let x in input) {
    for (let highest = -1, y = 0; y < input[x].length; y++) {
      [highest, cache] = findHigher(input, [x, y], highest, cache);
    }

    for (let highest = -1, y = input[x].length - 1; y >= 0; y--) {
      [highest, cache] = findHigher(input, [x, y], highest, cache);
    }
  }

  for (let y in input[0]) {
    for (let highest = -1, x = 0; x < input.length; x++) {
      [highest, cache] = findHigher(input, [x, y], highest, cache);
    }

    for (let highest = -1, x = input.length - 1; x >= 0; x--) {
      [highest, cache] = findHigher(input, [x, y], highest, cache);
    }
  }

  return cache.size;
};

console.log(visibleTrees(input));

const bestArea = (input) => {
  const results = [];

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      let tot = {
        l: 0,
        r: 0,
        t: 0,
        b: 0
      };

      const shouldStop = (xL, yL) => input[xL][yL] >= input[x][y];

      for (let xL = x - 1; xL >= 0; xL--) {
        tot.t++;
        if (shouldStop(xL, y)) break;
      }

      for (let xL = x + 1; xL < input.length; xL++) {
        tot.b++;
        if (shouldStop(xL, y)) break;
      }

      for (let yL = y - 1; yL >= 0; yL--) {
        tot.l++;
        if (shouldStop(x, yL)) break;
      }

      for (let yL = y + 1; yL < input[x].length; yL++) {
        tot.r++;
        if (shouldStop(x, yL)) break;
      }

      results.push(tot.l * tot.t * tot.r * tot.b);
    }
  }
  return Math.max(...results);
};

console.log(bestArea(input));
