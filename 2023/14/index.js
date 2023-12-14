const input = require("../../utils/getInput")(__dirname, { split: null });

// const input = `O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....`;

// const expectation = `OOOO.#.O..
// OO..#....#
// OO..O##..O
// O..#.OO...
// ........#.
// ..#....#.#
// ..O..#.O.O
// ..O.......
// #....###..
// #....#....`;

const getCols = (rows) => {
  const cols = rows[0].split("").map((_, i) => rows.map((row) => row[i]).join(""));
  return cols;
};

const getTitledIdxs = (lanes, compare, modifier) => {
  // the array arrives here already "ordered", so I don't need
  // to bother about columns or rows, it's all "sliding lanes"
  return lanes.map((lane) => {
    const laneArr = lane.split("");

    const { round, cube } = laneArr.reduce(
      (acc, item, i) => {
        if (item === "O") acc.round.push(i);
        if (item === "#") acc.cube.push(i);
        return acc;
      },
      { round: [], cube: [] }
    );

    const idxAfterTilting = round.reduce((acc, roundIdx) => {
      // check if there are any cubed rock on the sliding path (the compare function finds the closest)
      const cubeOnPath = cube.filter((cubedIdx) => compare(cubedIdx, roundIdx));
      let newIdx;

      // if there are cubed rock on the path, I need to take the right side
      // to have the round rock adjacent to it
      if (cubeOnPath.length > 0) {
        newIdx = cubeOnPath[modifier > 0 ? cubeOnPath.length - 1 : 0] + modifier;
      } else {
        newIdx = modifier > 0 ? 0 : laneArr.length - 1;
      }

      // if there's already a round rock adjacent, I need to stack them
      while (acc.includes(newIdx)) {
        newIdx = newIdx + modifier;
      }

      acc.push(newIdx);
      return acc;
    }, []);

    return idxAfterTilting;
  });
};

// this functions rebuilds the map from the tiltedIds
// I could do without but I found really helpful to have the
// visual representation for debugging purposes
const tilt = (arr, tiltedIdxs) => {
  return arr.map((line, idx) => {
    const lineArr = line.split("");
    return lineArr
      .map((item, lineIdx) => {
        if (tiltedIdxs[idx].includes(lineIdx)) {
          return "O";
        }
        if (item === "#") {
          return "#";
        }
        return ".";
      })
      .join("");
  });
};

const tiltNorth = (input) => {
  // to tilt north I need to find round rocks on columns
  const cols = getCols(input.split("\n"));
  // on an idx greater than a cubed rock idx
  // and then stack them at cubeed rock idx+1.
  const tiltedIdxs = getTitledIdxs(cols, (cubedIdx, roundIdx) => roundIdx > cubedIdx, 1);

  // then I need to bring the map back to the original rows
  return getCols(tilt(cols, tiltedIdxs)).join("\n");
};

const getTotal = (tilted) => {
  tilted = tilted.split("\n").reverse();
  return tilted.reduce((acc, line, value) => {
    const lineArr = line.split("");
    const numberOfRoundRocks = lineArr.filter((item) => item === "O");
    acc += numberOfRoundRocks.length * (value + 1);
    return acc;
  }, 0);
};

const tilted = tiltNorth(input);
console.log(getTotal(tilted));

const tiltEast = (input) => {
  const cols = input.split("\n");
  const tiltedIdxs = getTitledIdxs(cols, (cubedIdx, roundIdx) => roundIdx < cubedIdx, -1);
  return tilt(cols, tiltedIdxs).join("\n");
};

const tiltSouth = (input) => {
  const cols = getCols(input.split("\n"));
  const tiltedIdxs = getTitledIdxs(cols, (cubedIdx, roundIdx) => roundIdx < cubedIdx, -1);
  return getCols(tilt(cols, tiltedIdxs)).join("\n");
};

const tiltWest = (input) => {
  const cols = input.split("\n");
  const tiltedIdxs = getTitledIdxs(cols, (cubedIdx, roundIdx) => roundIdx > cubedIdx, 1);
  return tilt(cols, tiltedIdxs).join("\n");
};

const cycle = (input) => {
  const north = tiltNorth(input);
  const west = tiltWest(north);
  const south = tiltSouth(west);
  const east = tiltEast(south);
  return east;
};

const multipleCycles = (input, num) => {
  while (num) {
    input = cycle(input);
    num--;
  }
  return input;
};

// This function is basically reverse engineering:
// I identify the length of the pattern and then
// I found with a trial & error approach the
// magical calculation that works 🤷‍♀️
const getCyclesToRun = (cyclesToRun) => {
  const cache = [];
  let cycled = cycle(input);

  while (true) {
    cache.push(cycled);
    cycled = cycle(cycled);

    const cacheHits = cache.filter((c) => c === cycled);
    if (cacheHits.length > 1) {
      const cacheHitsIdxs = cache.map((c, i) => (c === cycled ? i : undefined)).filter((a) => !!a);
      const cycleLength = cacheHitsIdxs[1] - cacheHitsIdxs[0];

      // not sure why this works but it does
      // on the test, on my input, on MaxArt's (https://github.com/MaxArt2501/)
      // once again, not 100% proud, yet it works
      cyclesToRun = cyclesToRun % cycleLength ** 2;
      break;
    }
  }
  return cyclesToRun;
};

console.log(getTotal(multipleCycles(input, getCyclesToRun(1000000000))));
