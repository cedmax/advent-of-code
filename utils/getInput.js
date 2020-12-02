const fs = require("fs");

module.exports = (dirname, { split } = {}) => {
  let input = fs.readFileSync(`${dirname}/input.txt`, "utf-8");

  if (split != null) {
    input = input.split(split).filter((i) => !!i);
  }
  return input;
};
