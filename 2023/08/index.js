const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

// const input = `RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)`;

// const input = `LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`;

const parseMap = (map) => {
  return map.split("\n").reduce((acc, line) => {
    const [key, value] = line.split(" = ");
    acc[key] = value.match(/[0-9A-Z]+/g);
    return acc;
  }, {});
};

const parseInput = ([instructions, map]) => ({
  instructions: instructions.split(""),
  map: parseMap(map)
});

const ref = {
  L: 0,
  R: 1
};

const navigateMap = ({ instructions, map }, { startEndsWith, endEndsWith }) => {
  let nextKeys = Object.keys(map).filter((key) => key.endsWith(startEndsWith));

  return nextKeys.reduce((acc, nextKey) => {
    let count = 0;
    let currentInstrIdx = 0;
    do {
      const instruction = ref[instructions[currentInstrIdx]];
      currentInstrIdx = currentInstrIdx + 1 > instructions.length - 1 ? 0 : currentInstrIdx + 1;
      nextKey = map[nextKey][instruction];
      count++;
    } while (!nextKey.endsWith(endEndsWith));
    acc.push(count);
    return acc;
  }, []);
};

console.log(
  navigateMap(parseInput(input), {
    startEndsWith: "AAA",
    endEndsWith: "ZZZ"
  })[0]
);

// const newInput = `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`;

// via https://www.30secondsofcode.org/js/s/lcm/
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

console.log(lcm(...navigateMap(parseInput(input), { startEndsWith: "A", endEndsWith: "Z" })));
