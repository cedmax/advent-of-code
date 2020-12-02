var input = require("../../utils/getInput")(__dirname);

var nums = input.match(/[-\d]+/g);
console.log(
  nums.reduce(function (a, item) {
    return parseInt(a, 10) + parseInt(item, 10);
  }, 0)
);

while (
  input.match(
    /\{(?:[^\{\}]+\{[^\{\}]*\})*[^\{\}]+:"red"(?:[^\{\}]+\{[^\{\}]*\})*[^\{\}]*\}/g
  )
) {
  input = input.replace(
    /\{(?:[^\{\}]+\{[^\{\}]*\})*[^\{\}]+:"red"(?:[^\{\}]+\{[^\{\}]*\})*[^\{\}]*\}/g,
    null
  );
}

nums = input.match(/[-\d]+/g);

console.log(
  nums.reduce(function (a, item) {
    return parseInt(a, 10) + parseInt(item, 10);
  }, 0)
);

// \{(?:[^\{\}]*(:"red")[^\{\}]*)|
