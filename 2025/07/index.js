const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((l) => l.split(""));

const cloneInput = (input) => JSON.parse(JSON.stringify(input));

const firstLine = input.shift();
const startIndex = firstLine.findIndex((p) => p === "S");

let beamsXs = { [startIndex]: 1 };
let part1 = 0;

for (let i = 0; i < input.length; i++) {
  let newBeams = {};
  for (let beamX in beamsXs) {
    beamX = parseFloat(beamX);
    if (input[i][beamX] === "^") {
      part1++;
      newBeams[beamX - 1] = (newBeams[beamX - 1] || 0) + 1 * beamsXs[beamX];
      newBeams[beamX + 1] = (newBeams[beamX + 1] || 0) + 1 * beamsXs[beamX];
    } else {
      newBeams[beamX] = (newBeams[beamX] || 0) + (beamsXs[beamX] || 1);
    }
  }

  beamsXs = newBeams;
}

console.log(part1);
console.log(Object.values(beamsXs).reduce((tot, val) => tot + val, 0));
