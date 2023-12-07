const input = require("../../utils/getInput")(__dirname, { split: null });

// const input = `Time:      7  15   30
// Distance:  9  40  200`;

// via https://youmightnotneed.com/lodash#zip (my site, not cheating)
const zip = (arr, ...args) => arr.map((value, idx) => [value, ...args.map((arr) => arr[idx])]);

const getRaces = (input) => {
  const [timeString, distString] = input.split("\n");
  const times = timeString.match(/(\d+)/g).map(Number);
  const distances = distString.match(/(\d+)/g).map(Number);
  return zip(times, distances);
};

const getSpeeds = (races) => {
  return races.reduce((count, race) => {
    const [duration, record] = race;
    let holding = duration;
    let won = 0;

    while (holding) {
      const mm = (duration - holding) * holding;
      if (mm > record) {
        won++;
      }
      holding--;
    }

    return count * won;
  }, 1);
};

const races = getRaces(input);
console.log(getSpeeds(races));

const getRace = (input) => {
  const [timeString, distString] = input.split("\n");
  const time = Number(timeString.match(/(\d+)/g).join(""));
  const distance = Number(distString.match(/(\d+)/g).join(""));
  return [time, distance];
};

const race = getRace(input);
console.log(getSpeeds([race]));
