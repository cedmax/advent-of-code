const input = require("../../utils/getInput")(__dirname, { split: null });

// DISCLAIMER: the parsing is nasty, and I didn't want
// to go back and clean because I frankly don't like much
// the parsing exercises to begin with

const part1 = (input) => {
  const grid = input.split("\n").map((l) => l.split(/\s+/).filter((a) => a));
  const ops = grid.pop();

  return grid[0].reduce((tot, _, i) => tot + eval(grid.map((l) => l[i]).join(ops[i])), 0);
};

console.log(part1(input));

const part2 = (input) => {
  const lines = input.split("\n");
  const opsLine = lines.pop();
  const ops = opsLine.split(/\s+/);
  const intervals = [...opsLine.matchAll(/[^\s]/g)].map((a) => (a.index ? a.index : 0));
  intervals.push(opsLine.length);

  const remap = intervals.reduce((acc, _, op) => {
    if (intervals[op + 1]) {
      verticalLine = lines.map((l) => l.substring(intervals[op], intervals[op + 1]));
      acc.push(verticalLine);
    }
    return acc;
  }, []);

  return remap.reduce((tot, items, i) => {
    const newline = [];
    for (let i = items[0].length; i >= 0; i--) {
      let n = "";
      for (let item of items) {
        n += `${item.split("")[i] || ""}`.trim();
      }
      if (n) {
        newline.push(n);
      }
    }

    return tot + eval(newline.join(ops[i]));
  }, 0);
};

console.log(part2(input));
