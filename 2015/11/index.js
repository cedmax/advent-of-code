var input = require("../../utils/getInput")(__dirname);

function toLetters(input) {
  input = (+input).toString(26);
  var ret = [];
  while (input.length) {
    var a = input.charCodeAt(input.length - 1);
    if (input.length > 1)
      input = (parseInt(input.substr(0, input.length - 1), 26) - 1).toString(
        26
      );
    else input = "";

    if (a >= 48 /*'0'*/ && a <= 57 /*'9'*/)
      ret.unshift(String.fromCharCode(a + 49));
    //raise to += 'a'
    else ret.unshift(String.fromCharCode(a + 10)); //raise + 10 (make room for 0-9)
  }
  return ret.join("");
}

function fromLetters(str) {
  var out = 0,
    len = str.length,
    pos = len;
  while (--pos > -1) {
    out += (str.charCodeAt(pos) - 96) * Math.pow(26, len - 1 - pos);
  }
  return out;
}

function increment(input) {
  return toLetters(fromLetters(input));
}

function consecutives(input) {
  for (var i = 0, l = input.length; i + 2 < l; i++) {
    var check = [
      fromLetters(input[i]),
      fromLetters(input[i + 1]),
      fromLetters(input[i + 2]),
    ];

    if (check[2] - check[1] === 1 && check[1] - check[0] === 1) {
      return true;
    }
  }
  return false;
}

function matchRules(input) {
  var cons = consecutives(input);
  var doubles = input.match(/(.)\1/g) && input.match(/(.)\1/g).length > 1;
  var excludes = !input.match(/i|o|l/g);
  return cons && doubles && excludes;
}

while (!matchRules(input)) {
  input = increment(input);
}

console.log(input);
input = increment(input);

while (!matchRules(input)) {
  input = increment(input);
}

console.log(input);
process.chdir(__dirname);
