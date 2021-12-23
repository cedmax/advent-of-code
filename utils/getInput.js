const fs = require("fs");

module.exports = (dirname, { split, filename } = {}) => {
  let input = fs.readFileSync(`${dirname}/${filename || "input"}.txt`, "utf8");

  if (split != null) {
    input = input.split(split).filter((i) => !!i);
  }
  return input;
};
