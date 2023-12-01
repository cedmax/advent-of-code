const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`.split("\n");

let results = [];
for (const line of input) {
  const numbers = line.match(/\d/g);
  results.push(`${numbers[0]}${numbers[numbers.length - 1]}`);
}
console.log(results.reduce((acc, num) => acc + Number(num), 0));

// const input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`.split("\n");

const map = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
};

const convertString = (string) => (map[string] ? map[string] : parseInt(`${string}`, 10));
const rev = (str) => str.split("").reverse().join("");

const regex = new RegExp(`\\d${Object.keys(map).reduce((acc, key) => `${acc}|${key}`, "")}`, "g");
const revRegex = new RegExp(`\\d${Object.keys(map).reduce((acc, key) => `${acc}|${rev(key)}`, "")}`, "g");

results = [];
for (const line of input) {
  const firstDigit = line.match(regex)[0];
  const lastDigit = rev(line).match(revRegex).map(rev)[0];

  results.push(`${convertString(firstDigit)}${convertString(convertString(lastDigit))}`);
}

console.log(results.reduce((acc, num) => acc + Number(num), 0));
