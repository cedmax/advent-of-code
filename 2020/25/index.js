const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map(
  Number
);

function expMod(base, exp, mod) {
  if (exp == 0) return 1;
  if (exp % 2 == 0) {
    return Math.pow(expMod(base, exp / 2, mod), 2) % mod;
  } else {
    return (base * expMod(base, exp - 1, mod)) % mod;
  }
}
const [doorPublicKey, keyPublicKey] = input;

let v = 1;
let keyLoopSize = 0;
while (v !== keyPublicKey) {
  v = (v * 7) % 20201227;
  keyLoopSize++;
}

console.log(expMod(doorPublicKey, keyLoopSize, 20201227));
