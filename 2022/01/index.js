const input = require("../../utils/getInput")(__dirname, { split: "\n\n" }).map((i) => i.split("\n").map((i) => parseInt(i, 10)));

const sum = input.map((i) => i.reduce((acc, a) => acc + a, 0)).sort((a, b) => b - a);

console.log(sum[0]);
console.log(sum[0] + sum[1] + sum[2]);
