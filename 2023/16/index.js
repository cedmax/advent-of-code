const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const findMirrorsAndSplitters = (input) => {
  return input.reduce((acc, line, y) => {
    const characters = line.split("");
    characters.forEach((chr, x) => {
      if (chr !== ".") {
        acc.push({ chr, x, y });
      }
    });
    return acc;
  }, []);
};

// const drawMap = (paths) => {
//   paIntput = input.map((l) => l.split(""));

//   paths.forEach(({ x, y }) => {
//     paIntput[y][x] = "#";
//   });
//   return paIntput.map((l) => l.join("")).join("\n");
// };

const findBeams = (blockers, init, maxX, maxY) => {
  const paths = [];
  const beamscache = [init];

  for (let i = 0; i < beamscache.length; i++) {
    const beam = beamscache[i];
    let { move, dir, x, y } = beam;

    while (x >= 0 && y >= 0 && x < maxX && y < maxY) {
      paths.push({ x, y, move });

      blocker = blockers.find((item) => item.x == x && item.y == y);

      if (blocker) {
        paths.push({ x, y, move });
        let newBeams = [];
        if (blocker.chr === "|") {
          if (move === "x") {
            newBeams.push({ x, y: y - 1, move: "y", dir: -1 });
            newBeams.push({ x, y: y + 1, move: "y", dir: 1 });
          } else {
            newBeams.push({ x, y: y + dir, move: "y", dir: dir });
          }
          move = "y";
        }

        if (blocker.chr === "-") {
          if (move === "y") {
            newBeams.push({ x: x - 1, y, move: "x", dir: -1 });
            newBeams.push({ x: x + 1, y, move: "x", dir: 1 });
          } else {
            newBeams.push({ x: x + dir, y, move: "x", dir: dir });
          }
        }

        if (blocker.chr === "/") {
          newBeams.push({ x: move === "x" ? x : x - dir, y: move === "x" ? y - dir : y, move: move === "x" ? "y" : "x", dir: -dir });
        }

        if (blocker.chr === "\\") {
          newBeams.push({ x: move === "x" ? x : x + dir, y: move === "x" ? y + dir : y, move: move === "x" ? "y" : "x", dir: dir });
        }
        newBeams.forEach((newBeam) => {
          if (!beamscache.find((beam) => beam.x === newBeam.x && beam.y === newBeam.y && beam.move === newBeam.move && beam.dir === newBeam.dir)) {
            beamscache.push(newBeam);
          }
        });
      }

      eval(`${move} = ${move} + ${dir}`);

      if (blocker) {
        break;
      }
    }
  }
  // console.log(drawMap(paths));
  return paths;
};

const remapResults = (results) =>
  results.reduce((acc, { x, y }) => {
    acc[`${x}-${y}`] = (acc[`${x},${y}`] || 0) + 1;
    return acc;
  }, {});

const getTotalValue = (beams) => Object.keys(remapResults(beams)).length;

console.log(getTotalValue(findBeams(findMirrorsAndSplitters(input), { x: 0, y: 0, move: "x", dir: 1 }, input[0].length, input.length)));

const findMaxBeamsTotal = (blockers, input) => {
  const maxX = input[0].length;
  const maxY = input.length;

  const topRow = input[0].split("").map((_, i) => {
    return getTotalValue(findBeams(blockers, { x: i, y: 0, move: "y", dir: 1 }, maxX, maxY));
  });
  const bottomRow = input[0].split("").map((_, i) => {
    return getTotalValue(findBeams(blockers, { x: i, y: 0, move: "y", dir: -1 }, maxX, maxY));
  });
  const leftCol = input.map((_, i) => {
    return getTotalValue(findBeams(blockers, { x: 0, y: i, move: "x", dir: 1 }, maxX, maxY));
  });
  const rightCol = input.map((_, i) => {
    return getTotalValue(findBeams(blockers, { x: input[i].length - 1, y: i, move: "x", dir: -1 }, maxX, maxY));
  });

  return Math.max(...topRow, ...bottomRow, ...leftCol, ...rightCol);
};

console.log(findMaxBeamsTotal(findMirrorsAndSplitters(input), input));
