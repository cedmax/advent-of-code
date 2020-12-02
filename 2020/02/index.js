const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).map((item) => {
  return /([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/.exec(item);
});

const first = input.reduce((count, [input, minS, maxS, letter, psw]) => {
  const letterInPwd = psw.split(letter).length - 1;
  const min = parseInt(minS, 10);
  const max = parseInt(maxS, 10);
  if (min <= letterInPwd && letterInPwd <= max) {
    return count + 1;
  }
  return count;
}, 0);

console.log(first);

const second = input.reduce((count, [input, min, max, letter, psw]) => {
  if ((psw[min - 1] === letter) ^ (psw[max - 1] === letter)) {
    return count + 1;
  }
  return count;
}, 0);

console.log(second);
