const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

const parse = (monkeys) => {
  return monkeys.map((m) => {
    const matches = m.split(/:|\n/g).map((i) => i.trim());

    return {
      count: 0,
      items: eval(`[${matches[3]}]`),
      mod: matches[7].match(/(\d+)/g),
      operation: eval(`(old) => ${matches[5].replace("new = ", "")}`),
      move: eval(`(val) => (val % ${matches[7].match(/(\d+)/g)} === 0) ? ${matches[9].match(/(\d+)/g)} : ${matches[11].match(/(\d+)/g)} `)
    };
  });
};

const execute = (monkeys, len, worry) => {
  // line added to sort out part 2, I have no idea what I'm doing 😅
  const mod = monkeys.reduce((acc, val) => acc * val.mod, 1);

  for (let i = 0; i < len; i++) {
    monkeys.forEach(({ items, operation, move }, idx) => {
      while (items.length) {
        monkeys[idx].count++;
        const item = items.shift() % mod;
        const newVal = worry(operation(item));
        const moveTo = move(newVal);
        monkeys[moveTo].items.push(newVal);
      }
    });
  }
  return monkeys;
};

const getMonkeyBiz = (monkeys) => {
  const [a, b] = monkeys.map(({ count }) => count).sort((a, b) => b - a);

  return a * b;
};

console.log(getMonkeyBiz(execute(parse(input), 20, (val) => Math.floor(val / 3))));
console.log(getMonkeyBiz(execute(parse(input), 10000, (val) => val)));
