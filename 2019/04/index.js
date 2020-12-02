const input = require("../../utils/getInput")(__dirname, {
  split: "-",
}).map((i) => parseInt(i, 10));

const hasConsequentDigits = (str) => {
  const data = `${str}`.split("");
  return data.some((item, i) =>
    data.some((item1, ii) => item1 === item && i === ii + 1)
  );
};

const isIncreasing = (str) => {
  const data = `${str}`.split("").map((num) => parseInt(num, 10));

  return data.every((item, i, arr) => {
    const prev = arr[i - 1];
    return !prev || prev <= item;
  });
};

const data = [...Array(input[1] - input[0])].map((item, i) => input[0] + i);

const result = data.filter(
  (item) => hasConsequentDigits(item) && isIncreasing(item)
);

const hasTwoConsequentDigits = (str) => {
  const data = `${str}`.split("").map((num) => parseInt(num, 10));

  for (let i = 0; i < data.length; i++) {
    const differentFromNext =
      data[i] === data[i + 1] && data[i] !== data[i + 2];
    const differentFromPrev =
      data[i] === data[i + 1] && data[i] !== data[i - 1];

    if (differentFromNext && differentFromPrev) {
      return true;
    }
  }
};

const result2 = data.filter(
  (item) => hasTwoConsequentDigits(item) && isIncreasing(item)
);

console.log(result.length);
console.log(result2.length);
