var input = require("../../utils/getInput")(__dirname, { split: "\n" });

function compare(sues) {
  var refObj = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };
  while (sues.length) {
    var sue = sues.shift();
    var matches = Object.keys(sue).filter(function (key) {
      return sue[key] === refObj[key];
    });

    if (matches.length === Object.keys(sue).length - 1) {
      return sue.id;
    }
  }
}

function parseSues(inputs) {
  return inputs.map(function (item) {
    var sue = {};
    sue.id = item.match(/(\d+):/)[1];

    var properties = item.match(/(\w+): (\d+)/g);
    while (properties.length) {
      var prop = properties.shift().split(": ");
      sue[prop[0]] = parseInt(prop[1], 10);
    }
    return sue;
  });
}

console.log(compare(parseSues(input)));

function compareRanges(sues) {
  var refObj = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };
  while (sues.length) {
    var sue = sues.shift();
    var matches = Object.keys(sue).filter(function (key) {
      switch (key) {
        case "cats":
        case "trees":
          return sue[key] > refObj[key];
        case "pomeranians":
        case "goldfish":
          return sue[key] < refObj[key];
      }
      return sue[key] === refObj[key];
    });

    if (matches.length === Object.keys(sue).length - 1) {
      return sue.id;
    }
  }
}

console.log(compareRanges(parseSues(input)));
