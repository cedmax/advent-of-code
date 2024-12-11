const input = require("../../utils/getInput")(__dirname, { split: " " });

const calculate = (nums, cycles) => {
  let resultObj = nums.reduce((res, num) => ({ ...res, [num]: res[num] ? res[num] + 1 : 1 }), {});

  for (let i = 0; i < cycles; i++) {
    resultObj = Object.keys(resultObj).reduce((result, key) => {
      const count = resultObj[key];

      if (Number(key) === 0) {
        result["1"] = (result["1"] || 0) + count;
      } else if (key.length % 2 === 0) {
        const first = Number(key.slice(0, key.length / 2));
        const second = Number(key.slice(key.length / 2, key.length));
        result[`${first}`] = (result[`${first}`] || 0) + count;
        result[`${second}`] = (result[`${second}`] || 0) + count;
      } else {
        result[`${Number(key) * 2024}`] = (result[`${Number(key) * 2024}`] || 0) + count;
      }

      return result;
    }, {});
  }

  return Object.values(resultObj).reduce((a, b) => a + b, 0);
};

console.log(calculate(input, 25));
console.log(calculate(input, 75));
