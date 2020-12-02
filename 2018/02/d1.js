const input = require("../../utils/getInput")(__dirname);
const ids = input.split("\n");

let twice = 0;
let thrice = 0;

const getRepeted = (id) =>
  id
    .split("")
    .sort()
    .join("")
    .match(/(.)\1{1,}/gi) || [];

const uniqueByLength = (arr) =>
  arr.reduce((acc, rep) => {
    rep.length === 2 && (acc[0] = rep);
    rep.length === 3 && (acc[1] = rep);
    return acc;
  }, []);

ids.forEach((id) => {
  const repeated = uniqueByLength(getRepeted(id));
  repeated.forEach((repetition) => {
    repetition.length === 2 && ++twice;
    repetition.length === 3 && ++thrice;
  });
});

console.log(twice * thrice);
