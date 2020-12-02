var input = require("../../utils/getInput")(__dirname, { split: "\n" });

function isNice(input) {
  return (
    input.match(/([aeiou].*){3,}/) &&
    !input.match(/ab|cd|pq|xy/) &&
    input.match(/(.)\1/)
  );
}

function countNice(input) {
  return input.filter(isNice).length;
}

console.log(countNice(input));

function isNewNice(input) {
  return input.match(/(..).*\1/) && input.match(/(.).\1/);
}

function countNewNice(input) {
  return input.filter(isNewNice).length;
}

console.log(countNewNice(input));
