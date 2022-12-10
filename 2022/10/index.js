const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const parseOp = (op) => {
  const [action, value] = op.split(" ");
  return action === "noop" ? [1, 0] : [2, parseInt(value, 10)];
};

const isToSave = (val) => {
  return val <= 220 && (val === 20 || (val - 20) % 40 === 0);
};

const cycle = (ops, callback) => {
  let currentCycle = 0;
  let total = 0;
  let x = 1;

  ops.forEach((op) => {
    let [cyclesToDo, toAdd] = parseOp(op);
    while (cyclesToDo) {
      callback(++currentCycle, x);
      cyclesToDo--;
    }
    x += toAdd;
  });
};

const getTotal = (input) => {
  let total = 0;
  cycle(input, (cycle, x) => {
    if (isToSave(cycle)) {
      total += cycle * x;
    }
  });
  return total;
};

console.log(getTotal(input));

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

const normalisePos = (val) => {
  while (val > 39) {
    val -= 40;
  }
  return val;
};

const printCrt = (input) => {
  const crt = Array.from(Array(240)).map((i) => ".");
  let crtPos = 0;
  cycle(input, (_, x) => {
    const currentPixel = normalisePos(crtPos);
    if (x - 1 <= currentPixel && currentPixel <= x + 1) crt[crtPos] = "#";
    crtPos++;
  });
  chunk(crt, 40).forEach((line) => console.log(line.join("")));
};

printCrt(input);
