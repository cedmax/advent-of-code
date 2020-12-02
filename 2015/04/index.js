var crypto = require("crypto");
var input = require("../../utils/getInput")(__dirname);

function countZeroes(input, numOfZeroes, startFrom) {
  var c = startFrom || 0;
  var hash = "0";
  var equal = new Array(numOfZeroes + 1).join(0);

  while (hash != equal) {
    hash = crypto
      .createHash("md5")
      .update(input + ++c)
      .digest("hex")
      .substring(0, numOfZeroes);
  }
  return c;
}

var count = countZeroes(input, 5);
console.log(count);

console.log(countZeroes(input, 6, count));
