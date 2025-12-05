const input = require("../../utils/getInput")(__dirname, { split: null });

const parseInput = (input) => {
  const [rangesTxt, ingredientsTxt] = input.split("\n\n");
  const ranges = rangesTxt.split("\n").map((ln) => {
    const [start, end] = ln.split("-");
    return [parseFloat(start), parseFloat(end)];
  });

  const ids = ingredientsTxt.split("\n").map(parseFloat);

  return {
    ranges,
    ids,
  };
};

const parsedInput = parseInput(input);

const part1 = parsedInput.ids.reduce((tot, id) => {
  if (parsedInput.ranges.find(([start, end]) => start <= id && id <= end)) {
    tot++;
  }

  return tot;
}, 0);

console.log(part1);

let { ranges } = parsedInput;
let overlaps;

const uniqueList = (arr) => [...new Set(arr.map(JSON.stringify))].map(JSON.parse);
const isOverlapping = (a, b) => a[0] <= b[1] && a[1] >= b[0];
do {
  overlaps = false;
  ranges = ranges.map((range) => {
    for (let i = 0; i < ranges.length; i++) {
      const ref = ranges[i];

      if (uniqueList([range, ref]).length === 1) continue;
      if (isOverlapping(range, ref)) {
        overlaps = true;
        range[0] = Math.min(range[0], ref[0]);
        range[1] = Math.max(range[1], ref[1]);
      }
    }
    return range;
  });
} while (overlaps);

const uniqueRanges = uniqueList(ranges);
console.log(uniqueRanges.reduce((tot, range) => tot + range[1] - range[0] + 1, 0));
