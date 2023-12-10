const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((line) => line.split(" ").map(Number));

// const input = `0 3 6 9 12 15
// 1 3 6 10 15 21
// 10 13 16 21 30 45
// `
//   .split("\n")
//   .map((line) => line.split(" ").map(Number));

const part1 = (sequences) => {
  return sequences
    .reduce((total, seq) => {
      const lastNumOfSeq = [seq[seq.length - 1]];
      let calculation = seq.slice().reverse();

      do {
        calculation = calculation.reduce((acc, num, i) => {
          const next = calculation[i + 1];
          if (!isNaN(next)) {
            acc.push(num - next);
          }
          return acc;
        }, []);
        lastNumOfSeq.push(calculation[0] || 0);
      } while (calculation.filter((a) => a === 0).length !== calculation.length);

      total.push(lastNumOfSeq.reduce((acc, n) => acc + n, 0));
      return total;
    }, [])
    .reduce((acc, n) => acc + n, 0);
};

console.log(part1(input));

const part2 = (sequences) => {
  return sequences
    .reduce((total, seq) => {
      const firstNumOfSeq = [seq[0]];
      let calculation = seq.slice();

      do {
        calculation = calculation.reduce((acc, num, i) => {
          const next = calculation[i + 1];
          if (!isNaN(next)) {
            acc.push(num - next);
          }
          return acc;
        }, []);
        firstNumOfSeq.push(calculation[0] || 0);
      } while (calculation.filter((a) => a === 0).length !== calculation.length);

      total.push(firstNumOfSeq.reduce((acc, n) => acc + n, 0));
      return total;
    }, [])
    .reduce((acc, n) => acc + n, 0);
};

console.log(part2(input));
