const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map(
  (a) => parseInt(a, 10)
);

// extracted from the logic used in https://combinationsumcalculator.com/
const combinations = (rest, target, active = [], results = []) => {
  if (!rest.length) {
    if (active.reduce((a, b) => a + b, 0) === target) {
      results.push(active);
    }
  } else {
    var active2 = active.slice();
    active2.push(rest[0]);
    combinations(rest.slice(1), target, active2, results);
    combinations(rest.slice(1), target, active, results);
  }

  return results;
};

// const input = `20
// 15
// 10
// 5
// 5`
//   .split("\n")
//   .map((a) => parseInt(a, 10));
// const total = 25

const total = 150;

const result = combinations(input, total);
console.log(result.length);

const minLength = Math.min(...result.map((arr) => arr.length));
console.log(result.filter((arr) => arr.length === minLength).length);
