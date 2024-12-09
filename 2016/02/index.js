const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((a) => a.split(""));

const ops = {
  U: ([x, y]) => [x, y - 1],
  D: ([x, y]) => [x, y + 1],
  L: ([x, y]) => [x - 1, y],
  R: ([x, y]) => [x + 1, y],
};

const isInBound = (pad, [x, y]) => pad[y]?.[x];

const getPositions = (pad, startPos) =>
  input.reduce((code, lineOps, idx) => {
    let position = code[idx - 1] || startPos;

    lineOps.forEach((op) => {
      const afterOp = ops[op](position);
      if (isInBound(pad, afterOp)) {
        position = afterOp;
      }
    });

    code.push(position);
    return code;
  }, []);

const getResult = (pad, startPos) =>
  getPositions(pad, startPos)
    .map(([x, y]) => pad[y][x])
    .join("");

const pad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(getResult(pad, [1, 1]));

// prettier-ignore
const newPad = [
  [   ,    , "1",    ,    ], 
  [   , "2", "3", "4",    ], 
  ["5", "6", "7", "8", "9"], 
  [   , "A", "B", "C",    ], 
  [   ,    , "D",    ,    ], 
];
console.log(getResult(newPad, [0, 2]));
