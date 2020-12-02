var input = require("../../utils/getInput")(__dirname);

function lookAndSay(input, iterations) {
  input = input.toString().split("");
  var result = "";
  var seqLength = 1;
  input.forEach(function (num, index) {
    var next = input[index + 1];
    if (next !== num) {
      result += seqLength.toString() + num;
      seqLength = 1;
    } else {
      seqLength++;
    }
  });
  iterations--;
  if (iterations) {
    return lookAndSay(result, iterations);
  } else {
    return result;
  }
}

console.log(lookAndSay(input, 40).length);

console.log(lookAndSay(input, 50).length);
process.chdir(__dirname);
