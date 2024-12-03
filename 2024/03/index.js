const input = require("../../utils/getInput")(__dirname, { split: null }).replace(/\n/g, "");

const sumMul = (input) => {
  const validMatches = [...input.matchAll(/(mul\((\d{0,3}),(\d{0,3})\))/g)];

  return validMatches.reduce((acc, match) => acc + Number(match[2]) * Number(match[3]), 0);
};

console.log(sumMul(input));

const reToRemInvalid = /don't\(\).*?do\(\)/g;

console.log(sumMul(input.replace(reToRemInvalid, "")));
