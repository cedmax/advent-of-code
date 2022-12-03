const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((i) => i.split(""));

const getValue = (letter) => {
  const code = letter.codePointAt(0);
  if (code > 96) return code - 96;
  return code - 38;
};

const intersect = ([arr, ...args]) => [...new Set(arr.filter((item) => args.every((arr) => arr.includes(item))))][0];

const halve = (arr) => {
  const middle = Math.floor(arr.length / 2);
  return [arr.slice(0, middle), arr.slice(middle)];
};

console.log(
  input
    .map(halve)
    .map(intersect)
    .map(getValue)
    .reduce((a, b) => a + b, 0)
);

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

console.log(
  chunk(input, 3)
    .map(intersect)
    .map(getValue)
    .reduce((a, b) => a + b, 0)
);
