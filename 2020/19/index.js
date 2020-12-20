const input = require("../../utils/getInput")(__dirname);

const isFinalValue = (val) => ['"a"', '"b"'].includes(val);

const rules = input
  .match(/(\d+:(( \d+)+( \|( \d+)+)*| \"[a-z]\"))/g)
  .reduce((acc, line) => {
    const [idx, rest] = line.split(":");
    const val = rest.trim();
    acc[idx] = isFinalValue(val) ? val.replace(/\"/g, "") : `(${val})`;
    return acc;
  }, []);

const calculate = (rules) => {
  let rule = rules[0];
  while (rule.match(/\d+/)) {
    rule = rule.replace(/(\d+)/g, (match) => rules[match]);
  }
  rule = rule.replace(/ /g, "");
  return input.match(new RegExp(`^${rule}$`, "gm"));
};

console.log(calculate(rules).length);
