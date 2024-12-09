const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const parse = (input) =>
  input.map((line) => {
    line = line
      .replace(/\(/g, "[")
      .replace(/\)/g, "]")
      .replace(/ \+ /g, ",'+',")
      .replace(/ \* /g, ",'*',")
      .replace(/ \* /g, ",'*',");

    return eval(`[${line}]`);
  });

const resolveParentesis = (arr, total, operation = "+") => {
  arr.forEach((currentValue) => {
    if (currentValue instanceof Array) {
      currentValue = resolveParentesis(currentValue, 0);
    }

    if (isNaN(currentValue)) {
      operation = currentValue;
    } else {
      total = eval(`${total} ${operation} ${currentValue}`);
    }
  });

  return total;
};

console.log(
  parse(input).reduce((acc, parsed) => acc + resolveParentesis(parsed, 0), 0)
);

const replaceMatches = (str, matches) => {
  const matchesSolved = matches.map((match) =>
    unroll(match.substring(1, match.length - 1))
  );
  matches.forEach((match, i) => {
    str = str.replace(match, matchesSolved[i]);
  });
  return str;
};

const resolve = (str) => {
  const withAddedBrackets = str.replace(/(\d+ \+ \d+)/g, "($1)");
  return !withAddedBrackets.includes("(") || withAddedBrackets === `(${str})`
    ? eval(withAddedBrackets)
    : withAddedBrackets;
};

const unroll = (str) => {
  while (str.includes && (str.includes("*") || str.includes("+"))) {
    const matches = str.match(/(\([^\(\)]+\))/g);
    if (matches) {
      str = replaceMatches(str, matches);
    } else {
      str = resolve(str);
    }
  }
  return parseFloat(str);
};

console.log(input.reduce((acc, str) => acc + unroll(str), 0));
