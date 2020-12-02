var input = require("../../utils/getInput")(__dirname, { split: "\n" });

function parseInput(input) {
  var parsedCommand = input.match(/([a-zA-Z ]*) [\d+]/);
  var parsedCoords = input.match(/(\d+,\d+)/g);

  return {
    command: parsedCommand[1].trim(),
    start: parsedCoords[0].split(",").map(function (item) {
      return parseInt(item, 10);
    }),
    end: parsedCoords[1].split(",").map(function (item) {
      return parseInt(item, 10);
    }),
  };
}

function actOnLights(lights, switcher, inputs) {
  inputs.forEach(function (input) {
    var parsedInput = parseInput(input);

    lights = lights.map(function (row, rowPos) {
      if (rowPos >= parsedInput.start[0] && rowPos <= parsedInput.end[0]) {
        return row.map(function (light, lightPos) {
          if (
            lightPos >= parsedInput.start[1] &&
            lightPos <= parsedInput.end[1]
          ) {
            return switcher(parsedInput.command, light);
          } else {
            return light;
          }
        });
      } else {
        return row;
      }
    });
  });

  return lights;
}

function countLightsOn(lights) {
  var count = 0;
  lights.forEach(function (row) {
    row.forEach(function (light) {
      if (light) {
        count++;
      }
    });
  });
  return count;
}

function switchLight(command, light) {
  if (command === "toggle") return !light;
  if (command === "turn on") return true;
  if (command === "turn off") return false;
}

var lights = new Array(1000).fill(new Array(1000).fill(false));
console.log(countLightsOn(actOnLights(lights, switchLight, input)));

function countLightsBrightness(lights) {
  var count = 0;
  lights.forEach(function (row) {
    row.forEach(function (light) {
      count += light;
    });
  });
  return count;
}

function tuneLight(command, light) {
  if (command === "toggle") return light + 2;
  if (command === "turn on") return light + 1;
  if (command === "turn off") return light > 0 ? light - 1 : 0;
}

lights = new Array(1000).fill(new Array(1000).fill(0));
console.log(countLightsBrightness(actOnLights(lights, tuneLight, input)));
