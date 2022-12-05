const input = require("../../utils/getInput")(__dirname, { split: null });

const zip = ([arr, ...args]) => arr.map((value, idx) => [value, ...args.map((arr) => arr[idx])]);

const parseStack = (stack, re = /(\s\s\s\s?)|(\[[A-Z]\]\s?)/g) =>
  zip(
    stack
      .split("\n")
      .map((line) => [...line.match(re)].map((match) => match.replace(/\s+/, "")))
      .filter((matches) => !matches.every((match) => !match))
  ).map((a) => a.filter((i) => i));

const parseActions = (actions, re = /move (\d+) from (\d+) to (\d+)\n?/g) =>
  [...actions.matchAll(re)].map(([_, ...[qty, src, dst]]) => ({
    qty,
    src: --src,
    dst: --dst
  }));

const parse = (input) => {
  const [stack, actions] = input.split("\n\n");
  return { stack: parseStack(stack), actions: parseActions(actions) };
};

const act = ({ stack, actions }, { craneEffect }) => {
  actions.forEach(({ qty, src, dst }) => {
    const removed = stack[src].splice(0, qty);
    stack[dst] = [...craneEffect(removed), ...stack[dst]];
  });

  return stack
    .map((arr) => arr[0])
    .toString()
    .match(/([A-Z])/g)
    .join("");
};

console.log(act(parse(input), { craneEffect: (arr) => arr.reverse() }));
console.log(act(parse(input), { craneEffect: (arr) => arr }));
