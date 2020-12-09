const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).map((i) => parseInt(i, 10));
const findSum = (arr, sum) => {
  for (let i = 0; i < arr.length - 1; i++) {
    // start from i'th element till last element
    for (let j = i + 1; j < arr.length; j++) {
      // if desired sum is found, print it and return
      if (arr[i] + arr[j] == sum) {
        return;
      }
    }
  }
  return sum;
};

const preambleLen = 25;
const preamble = [];

let notFound;
for (let i = 0; i < input.length; i++) {
  const current = input[i];
  if (i >= preambleLen) {
    notFound = findSum(preamble, current);
    if (notFound) {
      break;
    }
    preamble.shift();
  }
  preamble.push(current);
}

console.log(notFound);

try {
  for (let i = 0; i < input.length; i++) {
    input.reduce((acc, item, j) => {
      if (j >= i && acc.reduce((a, b) => a + b, 0) <= notFound) {
        acc.push(item);

        if (acc.reduce((a, b) => a + b, 0) === notFound) {
          throw Math.min(...acc) + Math.max(...acc);
        }
      }
      return acc;
    }, []);
  }
} catch (e) {
  console.log(e);
}
