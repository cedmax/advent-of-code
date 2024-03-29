const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const rows = input.filter((rows) => !!rows).map((row) => row.split(/\t/).map(parseFloat));

const step1 = rows.reduce((acc, row) => {
  return acc + Math.max(...row) - Math.min(...row);
}, 0);

console.log(step1);

const step2 = rows.reduce((acc, row) => {
  let result;
  while (row.length) {
    const current = row.shift();
    row.forEach((item) => {
      if (!(item % current)) {
        result = item / current;
      }
      if (!(current % item)) {
        result = current / item;
      }
    });
  }
  return acc + result;
}, 0);

console.log(step2);
