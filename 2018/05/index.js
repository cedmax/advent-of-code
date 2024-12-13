const input = require("../../utils/getInput")(__dirname, { split: null });

// slooooow but it works

const polymers = [];
for (let letter = 0; letter < 26; letter++) {
  polymers.push(`${String.fromCharCode(letter + 97)}${String.fromCharCode(letter + 65)}`);
  polymers.push(`${String.fromCharCode(letter + 65)}${String.fromCharCode(letter + 97)}`);
}

const re = new RegExp(polymers.join("|"), "g");

let str = input;
while ([...str.matchAll(re)].length) {
  const firstMatch = [...str.matchAll(re)][0][0];
  str = str.replace(firstMatch, "");
}
console.log(str.length);

let shortest = input.length;
for (let letter = 0; letter < 26; letter++) {
  let newStr = input.replace(new RegExp(`${String.fromCharCode(letter + 97)}|${String.fromCharCode(letter + 65)}`, "g"), "");
  while ([...newStr.matchAll(re)].length) {
    const firstMatch = [...newStr.matchAll(re)][0][0];
    newStr = newStr.replace(firstMatch, "");
  }
  if (newStr.length < shortest) shortest = newStr.length;
}
console.log(shortest);
