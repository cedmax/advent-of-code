const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const example = `abba[mnop]qrst
// abcd[bddb]xyyx
// aaaa[qwer]tyui
// ioxxoj[asdfgh]zxcvbn`.split("\n");

const reInBrackets = /\[[^\]]*([^\[])([^\[])\2\1.*?\]/g;
const re4 = /([^\[])\1\1\1/g;
const reAbba = /([^\[])([^\[])\2\1/g;

const list = input.filter((str) => !str.match(reInBrackets)).filter((str) => str.replace(re4, "").match(reAbba));
console.log(list.length);

// const before = /\][^\[]*?([^\]])([^\]])\1.*?\[[^\]]*?\2\1\2[^\[]*?\]/g;

// const after = /\[[^\]]*?([^\[])([^\[])\1.*?\][^\[]*\2\1\2/g;
// const newList = input.filter((str) => str.match(before) || str.match(after));
// console.log(newList.length);
