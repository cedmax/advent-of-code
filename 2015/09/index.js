var input = require("../../utils/getInput")(__dirname, { split: "\n" });

function calcDistances(combinations, data) {
  var results = [];
  while (combinations.length) {
    var route = combinations.shift();
    var sum = 0;
    route.forEach(function (item, key) {
      if (route[key + 1]) {
        sum += data[item][route[key + 1]];
      }
    });

    results.push(sum);
  }
  return results;
}

function calcPermutations(directions) {
  return Object.keys(directions).reduce(function permute(res, item, key, arr) {
    return res.concat(
      (arr.length > 1 &&
        arr
          .slice(0, key)
          .concat(arr.slice(key + 1))
          .reduce(permute, [])
          .map(function (perm) {
            return [item].concat(perm);
          })) ||
        item
    );
  }, []);
}

function parseDirections(inputs) {
  var directions = {};
  while (inputs.length) {
    var input = inputs.shift();
    var data = input.match(/([A-Z])\w+|(\d)+/g);
    if (!directions[data[0]]) {
      directions[data[0]] = {};
    }
    if (!directions[data[1]]) {
      directions[data[1]] = {};
    }
    directions[data[0]][data[1]] = parseInt(data[2], 10);
    directions[data[1]][data[0]] = parseInt(data[2], 10);
  }
  return directions;
}

var dataMap = parseDirections(input);
console.log(
  Math.min.apply(Math, calcDistances(calcPermutations(dataMap), dataMap))
);

/*--- Part Two ---

The next year, just to show off, Santa decides to take the route with the longest distance instead.

He can still start and end at any two (different) locations he wants, and he still must visit each location exactly once.

For example, given the distances above, the longest route would be 982 via (for example) Dublin -> London -> Belfast.

What is the distance of the longest route?*/

console.log(
  Math.max.apply(Math, calcDistances(calcPermutations(dataMap), dataMap))
);
process.chdir(__dirname);
