const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const earliest = parseInt(input[0]);
const busses = input[1]
  .split(",")
  .filter((i) => i !== "x")
  .map((i) => parseInt(i, 10));

const result = busses
  .filter((i) => i !== "x")
  .reduce((acc, bus) => {
    let mod;
    let start = earliest - 1;
    while (mod !== 0) {
      start++;
      mod = start % bus;
    }

    acc.push(start);

    return acc;
  }, []);

const min = Math.min(...result);
const busId = busses[result.findIndex((i) => i === min)];

console.log((min - earliest) * busId);

const bussesWithIdx = input[1]
  .split(",")
  .map((n, i) => [parseInt(n, 10), i])
  .filter(([n]) => !Number.isNaN(n));

// this I wouldn't have guessed, I don't have the Math
// understanding of the problem. I bluntly copied it 🤷‍♀️
// Even after looking at it, I'm not full sure I grasp
// it in fullness
const findEarliestPattern = (bussesWithIdx) => {
  const [firstBus, ...buses] = bussesWithIdx;
  let multiplier = firstBus[0];
  let i = 0;

  buses.forEach(([bus, busIndex]) => {
    while (true) {
      if ((i + busIndex) % bus === 0) {
        multiplier *= bus;
        break;
      }
      i += multiplier;
    }
  });

  return i;
};

console.log(findEarliestPattern(bussesWithIdx));
