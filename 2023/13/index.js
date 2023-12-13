const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

// const input = `#.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.

// #...##..#
// #....#..#
// ..##..###
// #####.##.
// #####.##.
// ..##..###
// #....#..#`.split("\n\n");

const getRows = (map) => {
  return map.split("\n");
};

const getCols = (map) => {
  const rows = getRows(map);
  const cols = rows[0].split("").map((_, i) => rows.map((row) => row[i]).join(""));
  return cols;
};

const parseInput = (input) => {
  return input.map((map) => ({
    rows: getRows(map),
    cols: getCols(map)
  }));
};

const getAdjacentDupIndices = (arr) => {
  return arr.reduce((acc, item, idx) => {
    if (arr[idx + 1] === arr[idx]) {
      acc.push([idx, idx + 1]);
    }
    return acc;
  }, []);
};

const findMirror = (array) => {
  const result = [];

  for (let [start, end] of getAdjacentDupIndices(array)) {
    let isMirror = start;
    while (start >= 0 && end <= array.length - 1) {
      if (array[start] !== array[end]) {
        isMirror = undefined;
      }
      start--;
      end++;
    }

    if (!isNaN(isMirror)) {
      result.push(isMirror + 1);
      break;
    }
  }
  return result[0] || 0;
};

const getMirrorPositions = (data) => {
  return data.reduce(
    (acc, { rows, cols }) => {
      acc.horizontalMirrors.push(findMirror(rows));
      acc.verticalMirrors.push(findMirror(cols));
      return acc;
    },
    { horizontalMirrors: [], verticalMirrors: [] }
  );
};

const getTotal = ({ horizontalMirrors, verticalMirrors }) => {
  return horizontalMirrors.reduce((acc, a) => acc + a * 100, 0) + verticalMirrors.reduce((a, b) => a + b, 0);
};

const parsedInput = parseInput(input);
const mirrors = getMirrorPositions(parsedInput);
console.log(getTotal(mirrors));

const compareStrings = (string1, string2) => {
  const arr1 = string1.split("");
  const arr2 = (string2 || "").split("");

  return arr1.filter((a, i) => arr2[i] === a).length === arr1.length - 1;
};

const getAdjacentWithSmudgeIndices = (arr) => {
  return arr.reduce((acc, item, idx) => {
    if (compareStrings(arr[idx], arr[idx + 1])) {
      acc.push([idx, idx + 1, true]);
    } else if (arr[idx + 1] === arr[idx]) {
      acc.push([idx, idx + 1]);
    }

    return acc;
  }, []);
};

// This function is bad, but if you look towards the end of the file...
// it could've been much worse 😅
const findSmudgedMirror = (array) => {
  const result = [];

  for (let [start, end, smudged] of getAdjacentWithSmudgeIndices(array)) {
    let isMirror = start + 1;

    // I could do it differently, but I don't want to rework the original
    // solution too much: I'm rechecking all the reflection, including the
    // first couple, but if a smudge was already found, I only check for
    // identical matches, as there should be only 1 smudge per mirror.
    // This boolean allows me to ignore the comparison if the smudge
    // was pre-set outside of the while. Horrible, but functional
    let ignoreSmudge = smudged;
    while (start >= 0 && end <= array.length - 1) {
      if (smudged) {
        if (ignoreSmudge) {
          ignoreSmudge = false;
        } else if (array[start] !== array[end]) {
          isMirror = undefined;
        }
      } else {
        if (compareStrings(array[start], array[end])) {
          smudged = true;
        } else if (array[start] !== array[end]) {
          isMirror = undefined;
        }
      }

      start--;
      end++;
    }

    if (!isNaN(isMirror) && smudged) {
      result.push(isMirror);
      break;
    }
  }

  return result[0] || 0;
};

const getSmudgedMirrorPositions = (data) => {
  return data.reduce(
    (acc, { rows, cols }) => {
      acc.horizontalMirrors.push(findSmudgedMirror(rows));
      acc.verticalMirrors.push(findSmudgedMirror(cols));
      return acc;
    },
    { horizontalMirrors: [], verticalMirrors: [] }
  );
};

const smudgedMirrors = getSmudgedMirrorPositions(parsedInput);
console.log(getTotal(smudgedMirrors));

// The code below is the first version, the one I used to pass the challenge.
// It is possibly the worst code I've ver written and I'm not proud,
// but to be completely fair I care very little about aesthetics in AOC and
// I thought I'd leave it here for posterity, so I can always look back and
// think I can do better improve.
// 😬😬😬😬😬

// const getAdjacentWithSmudgeIndices = (arr) => {
//   return arr.reduce((acc, item, idx) => {
//     if (compareStrings(arr[idx], arr[idx + 1])) {
//       acc.push([idx, idx + 1]);
//     }
//     return acc;
//   }, []);
// };

// const findSmudgedMirror = (array) => {
//   const result = [];

//   let initialSmudge = false;
//   let smudgeFound = false;

//   const smudgedMirrors = getAdjacentWithSmudgeIndices(array);
//   const normalMirrors = getAdjacentDupIndices(array);

//   let mirrors;
//   if (smudgedMirrors.length) {
//     initialSmudge = true;
//     smudgeFound = true;
//     mirrors = smudgedMirrors;
//   } else {
//     mirrors = normalMirrors;
//   }

//   for (let [start, end] of mirrors) {
//     let resetOnSmudge = initialSmudge;
//     let isMirror = start;

//     while (start >= 0 && end <= array.length - 1) {
//       if (smudgeFound) {
//         if (resetOnSmudge) {
//           resetOnSmudge = false;
//         } else {
//           if (array[start] !== array[end]) {
//             isMirror = undefined;
//           }
//         }
//       } else {
//         if (compareStrings(array[start], array[end])) {
//           smudgeFound = true;
//         } else {
//           if (array[start] !== array[end]) {
//             isMirror = undefined;
//           }
//         }
//       }

//       start--;
//       end++;
//     }

//     if (!isNaN(isMirror) && smudgeFound) {
//       result.push(isMirror + 1);
//       break;
//     } else if (smudgeFound && normalMirrors.length) {
//       smudgeFound = false;
//       for (let [start, end] of normalMirrors) {
//         let isMirror = start;
//         while (start >= 0 && end <= array.length - 1) {
//           if (smudgeFound) {
//             if (array[start] !== array[end]) {
//               isMirror = undefined;
//             }
//           } else {
//             if (compareStrings(array[start], array[end])) {
//               smudgeFound = true;
//             } else {
//               if (array[start] !== array[end]) {
//                 isMirror = undefined;
//               }
//             }
//           }

//           start--;
//           end++;
//         }
//         if (!isNaN(isMirror) && smudgeFound) {
//           result.push(isMirror + 1);
//           break;
//         }
//       }
//     }
//   }

//   return result[0] || 0;
// };
