const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((a) => a.split(",").map((a) => a.split("-").map((i) => parseInt(i, 10))));

const checkContained = ([a, b]) => {
  const isAcontainedInB = a[0] >= b[0] && a[1] <= b[1];
  const isBcontainedInA = a[0] <= b[0] && a[1] >= b[1];
  return isAcontainedInB || isBcontainedInA ? 1 : 0;
};

console.log(input.map(checkContained).reduce((a, b) => a + b, 0));

const checkOverlaps = ([a, b]) => {
  const isAStartOverlapping = a[0] >= b[0] && a[0] <= b[1];
  const isAEndOverlapping = a[1] >= b[0] && a[1] <= b[1];
  const isBStartOverlapping = b[0] >= a[0] && b[0] <= a[1];
  const isBEndOverlapping = b[1] >= a[0] && b[1] <= a[1];

  return isAStartOverlapping || isAEndOverlapping || isBStartOverlapping || isBEndOverlapping ? 1 : 0;
};

console.log(input.map(checkOverlaps).reduce((a, b) => a + b, 0));
