const input = require("../../utils/getInput")(__dirname)
  .split("\n")
  .map((line) =>
    /([A-Za-z]+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./.exec(
      line
    )
  )
  .reduce((acc, [input, name, speed, duration, rest]) => {
    acc[name] = {
      speed: parseInt(speed, 10),
      duration: parseInt(duration, 10),
      rest: parseInt(rest, 10),
    };

    return acc;
  }, {});

console.log(input);

const totalKm = (raceLength, duration, rest, speed) => {
  const cycleLength = duration + rest;

  let cycles = 0;
  while (raceLength > cycleLength) {
    cycles = cycles + 1;
    raceLength = raceLength - cycleLength;
  }

  const timeSpentRunning =
    cycles * duration + (raceLength > duration ? duration : raceLength);

  return timeSpentRunning * speed;
};

const results = Object.keys(input).reduce((acc, deer) => {
  const raceLength = 2503;
  const { duration, rest, speed } = input[deer];

  acc.push(totalKm(raceLength, duration, rest, speed));

  return acc;
}, []);

console.log(Math.max(...results));

const raceLength = 2503;
const score = Object.keys(input).reduce(
  (acc, deer) => ({
    ...acc,
    [deer]: 0,
  }),
  {}
);

for (let i = 1; i <= raceLength; i++) {
  const currentState = Object.keys(input).reduce((acc, deer) => {
    const { duration, rest, speed } = input[deer];
    acc[deer] = totalKm(i, duration, rest, speed);
    return acc;
  }, {});
  const leadingDistance = Math.max(...Object.values(currentState));
  Object.keys(currentState).forEach((deer) => {
    if (currentState[deer] === leadingDistance) {
      score[deer] += 1;
    }
  });
}
console.log(Math.max(...Object.values(score)));
