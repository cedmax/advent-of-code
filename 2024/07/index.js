const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`.split("\n");

const parse = (input) => {
  return input.map((line) => {
    const [total, numbers] = line.split(": ");
    return { total: Number(total), numbers: numbers.split(" ").map(Number) };
  });
};

// via https://github.com/SeregPie/lodash.multipermutations/blob/master/src/module.js
const getPermutations = function (array, n) {
  let recur = (array, n) => {
    if (--n < 0) {
      return [[]];
    }
    let permutations = [];
    array.forEach((value) => {
      recur(array, n).forEach((permutation) => {
        permutation.unshift(value);
        permutations.push(permutation);
      });
    });
    return permutations;
  };
  return recur(array, n);
};

const isValid = ({ total, numbers }, operators) => {
  const combos = getPermutations(operators, numbers.length - 1);
  for (let combo of combos) {
    const res = numbers.reduce((loc, num, idx) => {
      if (idx > 0) {
        const op = combo[idx - 1];
        loc = op === "||" ? Number(`${loc}${num}`) : eval(`${loc}${op}${num}`);
      }
      return loc;
    }, numbers[0]);

    if (total === res) {
      return true;
    }
  }
  return false;
};

const calculate = (data, operators) => data.reduce((acc, line) => (isValid(line, operators) ? acc + line.total : acc), 0);

// slow AF, but it works
const data = parse(input);
console.log(calculate(data, ["*", "+"]));
console.log(calculate(data, ["*", "+", "||"]));
