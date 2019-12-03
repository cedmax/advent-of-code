const fs = require("fs");
const data = fs
  .readFileSync("./input.txt", "UTF-8")
  .split(",")
  .map(a => parseInt(a, 10));

const ops = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
  99: null
};

const calc = (input, a, b) => {
  const data = [...input];
  data[1] = a;
  data[2] = b;

  for (let i = 0; i < data.length; i++) {
    const op = ops[data[i]];

    if (op) {
      const res = op(data[data[++i]], data[data[++i]]);
      data[data[++i]] = res;
    } else {
      break;
    }
  }

  return data[0];
};

console.log(calc(data, 12, 2));

const nouns = [...Array(100).keys()];
const verbs = [...Array(100).keys()];

const expected = 19690720;
nouns.forEach(noun => {
  verbs.forEach(verb => {
    if (calc(data, noun, verb) === expected) {
      console.log(100 * noun + verb);
    }
  });
});
