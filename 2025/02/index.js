const input = require("../../utils/getInput")(__dirname, { split: null });

const parse = (input) => input.split(",").map((range) => range.split("-").map(parseFloat));

const parsedInput = parse(input);

const sumInvalidIds = (input, rule) =>
  input.reduce((acc, [l, r]) => {
    while (l <= r) {
      if (rule(`${l}`)) {
        acc += l;
      }
      l++;
    }

    return acc;
  }, 0);

const re1 = /^([0-9]+)(\1{1})$/;
const res1 = sumInvalidIds(parsedInput, (n) => !(n.length % 2) && n.match(re1));

console.log(res1);

const re2 = /^([0-9]+)(\1{1,})$/;
const res2 = sumInvalidIds(parsedInput, (n) => n.match(re2));

console.log(res2);
