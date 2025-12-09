const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((ln) => ln.split(",").map(parseFloat));

const calcDistance = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
const clone = (arr) => JSON.parse(JSON.stringify(arr));

const distances = [];

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    const distance = calcDistance(input[i], input[j]);
    distances.push({
      a: JSON.stringify(input[i]),
      b: JSON.stringify(input[j]),
      d: distance,
    });
  }
}

distances.sort((a, b) => a.d - b.d);

const part1 = (input, distances) => {
  distances = clone(distances);
  let circuitsMap = input.map((itm) => [JSON.stringify(itm)]);

  for (let i = 0; i < 1000; i++) {
    const { a, b } = distances.shift();
    const aIdx = circuitsMap.findIndex((box) => box.includes(a));
    const bIdx = circuitsMap.findIndex((box) => box.includes(b));
    if (aIdx !== bIdx) {
      circuitsMap[aIdx] = [...circuitsMap[aIdx], ...circuitsMap[bIdx]];
      circuitsMap.splice(bIdx, 1);
    }
  }

  const circuitSizes = circuitsMap.map((a) => a.length).sort((a, b) => b - a);
  circuitSizes.length = 3;
  return circuitSizes.reduce((tot, v) => tot * v, 1);
};

console.log(part1(input, distances));

const part2 = (input, distances) => {
  circuitsMap = input.map((itm) => [JSON.stringify(itm)]);
  distances = clone(distances);
  let a, b;
  while (circuitsMap.length > 1) {
    const entry = distances.shift();
    (a = entry.a), (b = entry.b);
    const aIdx = circuitsMap.findIndex((box) => box.includes(a));
    const bIdx = circuitsMap.findIndex((box) => box.includes(b));
    if (aIdx !== bIdx) {
      circuitsMap[aIdx] = [...circuitsMap[aIdx], ...circuitsMap[bIdx]];
      circuitsMap.splice(bIdx, 1);
    }
  }

  return JSON.parse(a)[0] * JSON.parse(b)[0];
};

console.log(part2(input, distances));
