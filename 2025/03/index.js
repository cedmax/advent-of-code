const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const calculate = (input, len) =>
  input.reduce((total, bank) => {
    const batteries = bank.split("").map(parseFloat);

    let bankSequence = "";
    let count = len;
    while (count) {
      const maxFirstPosIdx = batteries.length - --count;
      const possibleNextDigits = [...batteries].splice(0, maxFirstPosIdx);
      const nextDigit = Math.max(...possibleNextDigits);
      const indexOfDigit = batteries.findIndex((n) => n === nextDigit);
      batteries.splice(0, indexOfDigit + 1);

      bankSequence = `${bankSequence}${nextDigit}`;
    }

    return total + parseFloat(bankSequence);
  }, 0);

console.log(calculate(input, 2));
console.log(calculate(input, 12));
