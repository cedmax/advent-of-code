const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
});

const memory = input.reduce((acc, line) => {
  const varName = line.split(" ")[0];
  acc[varName] = 0;
  return acc;
}, {});

let higherValue = 0;

input.forEach((line) => {
  const bool = line.split(" if ")[1];
  const varName = bool.split(" ")[0];
  const statement = eval(bool.replace(varName, `memory['${varName}']`));
  if (statement) {
    const operation = line.match(/(\w+) (inc|dec) (-?\d+)/);

    if (operation[2] === "inc") {
      memory[operation[1]] = memory[operation[1]] + parseInt(operation[3], 10);
    } else {
      memory[operation[1]] = memory[operation[1]] - parseInt(operation[3], 10);
    }
    higherValue = Math.max(higherValue, Math.max(...Object.values(memory)));
  }
});

console.log(Math.max(...Object.values(memory)));
console.log(higherValue);
