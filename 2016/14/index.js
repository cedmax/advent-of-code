const { createHash } = require("crypto");
const input = require("../../utils/getInput")(__dirname, { split: null });

const hasher = (str) => createHash("md5").update(`${input}${str}`).digest("hex");

let keysFound = 0;
let currentIndex = 0;
let lastIndex = 0;
while (keysFound < 64) {
  const hash = hasher(currentIndex);
  const re = /(.)\1\1/;
  const match = hash.match(re);
  if (match) {
    const re2 = new RegExp(`(${match[1]})\\1\\1\\1\\1`);
    for (let i = currentIndex + 1; i < currentIndex + 1000; i++) {
      const newhash = hasher(i);
      if (newhash.match(re2)) {
        lastIndex = currentIndex;
        keysFound++;
        break;
      }
    }
  }
  currentIndex++;
}

console.log(lastIndex);
