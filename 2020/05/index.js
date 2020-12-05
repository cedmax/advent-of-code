const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
});

const map = { B: "1", F: "0", R: "1", L: 0 };
const arrayOfIds = input
  .map((item) =>
    parseInt(
      item.replace(/[BFRL]/g, (c) => map[c]),
      2
    )
  )
  .sort();

console.log(Math.max(...arrayOfIds));

let missingNumber = (arr) => {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const checkArr = [...new Array(max).keys()];
  return checkArr.filter((n, i) => i > min && !arr.includes(i))[0];
};
console.log(missingNumber(arrayOfIds));
