var input = require("../../utils/getInput")(__dirname, { split: "" });

var _ = {
  identity: require("lodash.identity"),
  countBy: require("lodash.countby"),
};

var count = _.countBy(input, _.identity);
console.log(count["("] - count[")"]);

count = 0;
var index = 0;
while (input && count >= 0) {
  index++;
  count = count + (input.shift() === "(" ? 1 : -1);
}
console.log(index);
