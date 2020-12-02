var input = require("../../utils/getInput")(__dirname, { split: "\n" });

function retriveSizes(dimension) {
  var sizes = dimension.split("x").map(Number);
  return {
    l: sizes[0],
    w: sizes[1],
    h: sizes[2],
  };
}

function calculateAreas(sizes) {
  return [2 * sizes.l * sizes.w, 2 * sizes.w * sizes.h, 2 * sizes.h * sizes.l];
}

function neededPaper(sides) {
  return (
    sides.reduce(function (a, b) {
      return a + b;
    }, 0) +
    Math.min.apply(Math, sides) / 2
  );
}

function calculateNeededPaper(dimensions, surface) {
  surface = surface || 0;
  surface += neededPaper(calculateAreas(retriveSizes(dimensions.shift())));

  if (dimensions.length) {
    return calculateNeededPaper(dimensions, surface);
  } else {
    return surface;
  }
}
console.log(calculateNeededPaper([...input]));

function neededRibbon(dimensions) {
  var volume = dimensions.reduce(function (a, b) {
    return a * b;
  });

  dimensions.splice(dimensions.indexOf(Math.max.apply(Math, dimensions)), 1);
  var shortesPerimeter =
    dimensions.reduce(function (a, b) {
      return a + b;
    }) * 2;

  return volume + shortesPerimeter;
}

function calculateNeededRibbon(dimensions, surface) {
  surface = surface || 0;
  surface += neededRibbon(dimensions.shift().split("x").map(Number));

  if (dimensions.length) {
    return calculateNeededRibbon(dimensions, surface);
  } else {
    return surface;
  }
}

console.log(calculateNeededRibbon([...input]));
