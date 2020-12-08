const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
}).reduce((acc, line) => {
  const [container, content] = line.split(" bags contain ");
  const contentSplit = content.split(", ").reduce((acc, bags) => {
    const [string, qty, descr] = bags.match(/^(\d+) (.+) bag/) || [];
    if (!descr) return acc;

    return {
      ...acc,
      [descr]: parseInt(qty, 10),
    };
  }, []);

  acc[container] = contentSplit;
  return acc;
}, {});

const findParents = (acc, obj, string) => {
  const parents = Object.keys(obj).filter((key) =>
    Object.keys(obj[key]).includes(string)
  );

  parents.forEach((key) => findParents(acc, obj, key));
  acc.add(string);
  return acc;
};

console.log(findParents(new Set(), input, "shiny gold").size - 1);

const findChildren = (input, string) => {
  if (input[string] instanceof Array) return 1;
  return Object.keys(input[string]).reduce((res, key) => {
    return res + input[string][key] * findChildren(input, key);
  }, 1);
};

console.log(findChildren(input, "shiny gold") - 1);
