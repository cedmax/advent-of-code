const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((line) => ({
  dir: line.substring(0, 1),
  len: parseFloat(line.substring(1, line.length)),
}));

let pos = 50;
let count = 0;

const getNewAbsPos = (pos, dir, len) => pos + len * (dir === "R" ? 1 : -1);
const applyRotationToAbs = (abs) => (100 + abs) % 100;

for (let { dir, len } of input) {
  pos = applyRotationToAbs(getNewAbsPos(pos, dir, len));

  if (pos % 100 === 0) {
    ++count;
  }
}

console.log({ first: count });

pos = 50;
count = 0;

for (let { dir, len } of input) {
  if (len > 100) {
    count = count + Math.floor(len / 100);
    len = len % 100;
  }

  const absPos = getNewAbsPos(pos, dir, len);
  const rotatedPos = applyRotationToAbs(absPos);

  if ((absPos !== rotatedPos || absPos === 0 || absPos === 100) && pos !== 0) {
    count++;
  }

  pos = rotatedPos;
}

console.log({ second: count });
