var input = require("../../utils/getInput")(__dirname, { split: "\n" });

function getCounts(inputs) {
  var length = 0;
  while (inputs.length) {
    var input = inputs.shift();
    length += input.length - eval(input).length;
  }
  return length;
}

console.log(getCounts(input.slice(0)));

function getCountsEnc(inputs) {
  var length = 0;
  while (inputs.length) {
    var input = inputs.shift();
    length += JSON.stringify(input).length - input.length;
  }
  return length;
}

console.log(getCountsEnc(input.slice(0)));
