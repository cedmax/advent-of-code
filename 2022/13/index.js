const input = require("../../utils/getInput")(__dirname, { split: "\n\n" }).map((i) => eval(i.split("\n").map(eval)));

const check = ([left, right]) => {
  left = JSON.parse(JSON.stringify(left));
  right = JSON.parse(JSON.stringify(right));

  while (left.length || right.length) {
    let a = left.shift();
    let b = right.shift();

    if (Number(a) > Number(b)) return 1;

    if (Number(b) > Number(a)) return -1;

    if (a == undefined) return -1;
    if (b == undefined) return 1;

    if (Array.isArray(a) || Array.isArray(b)) {
      if (!Array.isArray(a)) a = [a];
      if (!Array.isArray(b)) b = [b];

      const ret = check([a, b]);
      if (typeof ret === "number") {
        return ret;
      }
    }
  }
};

console.log(input.map(check).reduce((acc, result, i) => acc + (result < 0 ? i + 1 : 0), 0));

const secondPart = () => {
  const dividers = [[[2]], [[6]]];
  const newInput = [...input.flat(), ...dividers];

  const sorted = newInput.sort((a, b) => check([a, b]));

  const firstDivider = sorted.findIndex((a) => JSON.stringify(a) === JSON.stringify(dividers[0])) + 1;
  const second = sorted.findIndex((a) => JSON.stringify(a) === JSON.stringify(dividers[1])) + 1;

  return firstDivider * second;
};

console.log(secondPart(input));
