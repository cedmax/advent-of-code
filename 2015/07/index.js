var input = require("../../utils/getInput")(__dirname, { split: "\n" });

function modulo(a, b) {
  return a - Math.floor(a / b) * b;
}

function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

function ToUint16(x) {
  return modulo(ToInteger(x), Math.pow(2, 16));
}

function execute(first, operation, second) {
  first = parseInt(first);
  second = parseInt(second);
  switch (operation) {
    case "AND":
      return ToUint16(first & second);
    case "OR":
      return ToUint16(first | second);
    case "LSHIFT":
      return ToUint16(first << second);
    case "RSHIFT":
      return ToUint16(first >> second);
    case "NOT":
      return ToUint16(~second);
  }
}

function resolve(wire, map) {
  if (wire.first && !wire.second && !wire.operator) {
    return wire.first;
  }

  if (wire.first && isNaN(wire.first)) {
    wire.first = findWirePower(map, wire.first);
  }
  if (wire.second && isNaN(wire.second)) {
    wire.second = findWirePower(map, wire.second);
  }

  return execute(wire.first, wire.operator, wire.second);
}

function findWirePower(map, wireId) {
  if (wireId && map[wireId]) {
    return resolve(map[wireId], map);
  } else {
    return wireId;
  }
}

function mapDestionations(inputs) {
  var map = {};
  inputs.forEach(function (input) {
    var matches = input.match(/^(.+) -> (.+)$/);
    var operations = matches[1].match(/([0-9a-z]*)([ A-Z]*)(.*)/);
    map[matches[2]] = {
      first: operations[1],
      operator: operations[2].trim(),
      second: operations[3],
    };
  });
  return map;
}
var powerOnA = findWirePower(mapDestionations(input), "lx");
console.log(powerOnA);

var map = mapDestionations(input);
map.b.first = powerOnA;
console.log(findWirePower(map, "lx"));
process.chdir(__dirname);
