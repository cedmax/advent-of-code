var input = require("../../utils/getInput")(__dirname);

var nums = input.match(/[-\d]+/g).map((i) => parseInt(i, 10));
console.log(
  nums.reduce(function (a, item) {
    return a + item;
  }, 0)
);

var recursive = function (portion) {
  if (portion instanceof Array) {
    return portion.reduce((a, b) => a + recursive(b), 0);
  }
  if (typeof portion === "string") {
    return 0;
  }
  if (typeof portion === "number") {
    return portion;
  }
  if (typeof portion === "object") {
    if (Object.values(portion).includes("red")) {
      return 0;
    }
    return Object.values(portion).reduce((acc, value) => {
      return acc + recursive(value);
    }, 0);
  }
};

console.log(recursive(JSON.parse(input)));
