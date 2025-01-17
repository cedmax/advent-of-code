const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

const parse = (input) => {
  const matrix = input.map((block) => block.split("\n").map((line) => line.split("")));

  return matrix.map((block) =>
    block.reduce((acc, line, y) => {
      line.forEach((item, x) => {
        acc[x] = acc[x] ?? [];
        acc[x][y] = item;
      });
      return acc;
    }, [])
  );
};

const countPins = (input) => input.map((block) => block.map((line) => line.filter((i) => i === "#").length - 1));

const parsedInput = parse(input);
const expectedLength = parsedInput[0][0].length - 1;

const keysPins = countPins(parsedInput.filter((line) => line[0][0] === "."));
const locksPins = countPins(parsedInput.filter((line) => line[0][0] === "#"));

const result = locksPins.reduce(
  (count, lock) =>
    count +
    keysPins.filter((key) => {
      const workingPins = key.filter((pin, pos) => pin + lock[pos] < expectedLength).length;
      return workingPins === key.length;
    }).length,
  0
);

console.log(result);
