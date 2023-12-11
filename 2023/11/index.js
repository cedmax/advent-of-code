const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((line) => line.split(""));

// const input = `...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....`
//   .split("\n")
//   .map((line) => line.split(""));

//via https://www.kodeclik.com/array-combinations-javascript/
const getCombinations = (items) => {
  const pairs = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      pairs.push([items[i], items[j]]);
    }
  }

  return pairs;
};

const getEmptyRows = (grid) => {
  const emptyLinesIdxs = [];
  for (let lineIdx = 0; lineIdx < grid.length; lineIdx++) {
    const line = grid[lineIdx];
    if (line.every((x) => x === ".")) {
      emptyLinesIdxs.push(lineIdx);
    }
  }
  return emptyLinesIdxs;
};

const getEmptyCols = (grid) => {
  const emptyRowsIdxs = [];
  for (let colIdx = 0; colIdx < grid[0].length; colIdx++) {
    const rows = grid.map((line) => line[colIdx]);

    if (rows.every((x) => x === ".")) {
      emptyRowsIdxs.push(colIdx);
    }
  }
  return emptyRowsIdxs;
};

//
// FIRST, NAIVE BRUTE-FORCE VERSION
//
// const expand = (grid) => {
//   const horizontalsToAdd = getEmptyRows(grid);
//   const verticalsToAdd = getEmptyCols(grid);

//   grid = grid
//     .reduceRight((acc, line, lineIdx) => {
//       const newLine = line
//         .reduceRight((lineAcc, chr, colIdx) => {
//           if (verticalsToAdd.includes(colIdx)) {
//             lineAcc.push(chr);
//           }
//           lineAcc.push(chr);
//           return lineAcc;
//         }, [])
//         .reverse();

//       if (horizontalsToAdd.includes(lineIdx)) {
//         acc.push(newLine);
//       }

//       acc.push(newLine);
//       return acc;
//     }, [])
//     .reverse();

//   return grid;
// };

const expandCoords = (grid, coords, times) => {
  const emptyRowsIdxs = getEmptyRows(grid);
  const emptyColsIdxs = getEmptyCols(grid);

  return coords.map(({ x, y }) => {
    let newY = y;
    let newX = x;
    emptyRowsIdxs.forEach((rowIdx) => {
      if (y > rowIdx) {
        newY = newY + times - 1;
      }
    });

    emptyColsIdxs.forEach((colIdx) => {
      if (x > colIdx) {
        newX = newX + times - 1;
      }
    });
    return { x: newX, y: newY };
  });
};

const getGalaxiesCoords = (grid, chr) => {
  return grid.reduce((coords, line, lineIdx) => {
    line.forEach((col, colIdx) => {
      if (col === chr) {
        coords.push({ x: colIdx, y: lineIdx });
      }
    });
    return coords;
  }, []);
};

const getDistances = (combinations) =>
  combinations.reduce((acc, [a, b]) => {
    return acc + Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }, 0);

const originalGalaxiesCoords = getGalaxiesCoords(input, "#");

let expandedGalaxiesCoords = expandCoords(input, originalGalaxiesCoords, 2);
console.log(getDistances(getCombinations(expandedGalaxiesCoords)));

expandedGalaxiesCoords = expandCoords(input, originalGalaxiesCoords, 1000000);
console.log(getDistances(getCombinations(expandedGalaxiesCoords)));
