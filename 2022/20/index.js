const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((i) => parseInt(i, 10));

// const input = `1
// 2
// -3
// 3
// -2
// 0
// 4`
//   .split("\n")
//   .map((i) => parseInt(i, 10));

const findSolution = (input) => {
  const inputClone = [...input];
  let done = [...input].map(() => false);
  let cursor = 0;

  while (done.filter((i) => !i).length) {
    if (done[cursor]) {
      cursor++;
    } else {
      const modifier = inputClone.splice(cursor, 1)[0];
      done.splice(cursor, 1)[0];

      const destIdx = (cursor + modifier) % inputClone.length;

      inputClone.splice(destIdx, 0, modifier);
      done.splice(destIdx, 0, true);
    }
  }
  return inputClone;
};

const calculate = (input) => {
  const zeroIdx = input.findIndex((i) => i === 0);
  return input[(1000 + zeroIdx) % input.length] + input[(2000 + zeroIdx) % input.length] + input[(3000 + zeroIdx) % input.length];
};

console.log(calculate(findSolution(input)));

// const loop = (input) => {
//   let temp = findSolution(input);
//   console.log(temp.join(", "));
//   for (let i = 0; i < 9; i++) {
//     temp = findSolution(temp);
//     console.log(temp.join(", "));
//   }
//   return temp;
// };

// console.log(calculate(loop(input.map((i) => i * 811589153))));
