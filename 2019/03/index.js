const interSections = require("./intersections");
const ops = require("./ops");
const data = require("../../utils/getInput")(__dirname, {
  split: "\n",
});
const cableA = data[0].split(",");
const cableB = data[1].split(",");

const initial = {
  x: 0,
  y: 0,
};

const calculateJourney = (arr) =>
  arr.reduce((acc, dir) => {
    const length = parseInt(dir.slice(1, dir.length), 10);
    const previous = (acc[acc.length - 1] && acc[acc.length - 1][1]) || initial;
    const segment = ops[dir.charAt(0)](previous, length);
    acc.push(segment);
    return acc;
  }, []);

const journeyA = calculateJourney(cableA);
const journeyB = calculateJourney(cableB);

const calculateSteps = (a, b, ca, cb, extra) => {
  a = [...a];
  a.length = ca;

  const stepsA = a.reduce((acc, dir) => {
    acc += parseInt(dir.slice(1, dir.length), 10);
    return acc;
  }, 0);

  b = [...b];
  b.length = cb;
  const stepsB = b.reduce((acc, dir) => {
    acc += parseInt(dir.slice(1, dir.length), 10);
    return acc;
  }, 0);

  return stepsA + stepsB + extra;
};

const steps = [];
const dist = [];
journeyA.forEach(([aStart, aEnd], countA) => {
  journeyB.forEach(([bStart, bEnd], countB) => {
    const int = interSections(aStart, aEnd, bStart, bEnd);
    if (!int) return;

    const curr = Math.abs(int.x - initial.x) + Math.abs(int.y - initial.y);
    if (!curr) return;

    dist.push(curr);
    const extraA = Math.abs(int.x - aStart.x) + Math.abs(int.y - aStart.y);
    const extraB = Math.abs(int.x - bStart.x) + Math.abs(int.y - bStart.y);
    steps.push(calculateSteps(cableA, cableB, countA, countB, extraA + extraB));
  });
});

console.log("distance", Math.min(...dist));
console.log("steps", Math.min(...steps));
