const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).map((line) => [line.split(" ")[0], parseInt(line.split(" ")[1], 10)]);

const ops = {
  nop: (idx, acc) => [idx + 1, acc],
  acc: (idx, acc, val) => [idx + 1, acc + val],
  jmp: (idx, acc, val) => [idx + val, acc],
};

const execute = (input, execList) => {
  let index = 0;
  let acc = 0;

  while (!execList.includes(index)) {
    execList.push(index);
    [index, acc] = ops[input[index][0]](index, acc, input[index][1]);
  }
  return acc;
};

console.log(execute([...input], []));

const toggleOp = (op) => {
  if (op === "nop") return "jmp";
  if (op === "jmp") return "nop";
  return op;
};

const executeFailProof = (input, execList) => {
  let changeOp = 0;
  let index = 0;
  let acc = 0;

  let op;
  while (index !== input.length) {
    if (index === changeOp) {
      op = input[index][0];
      input[index][0] = toggleOp(op);
    }

    execList.push(index);
    [index, acc] = ops[input[index][0]](index, acc, input[index][1]);

    if (execList.includes(index)) {
      input[changeOp][0] = op;
      // I need to move changeOp to the next index in the exec path
      const [nextIdx] = ops[input[changeOp][0]](
        changeOp,
        acc,
        input[changeOp][1]
      );

      changeOp = nextIdx;
      index = 0;
      acc = 0;
      execList = [];
    }
  }

  return acc;
};

console.log(executeFailProof([...input], []));
