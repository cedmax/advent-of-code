const { createHash } = require("crypto");
const input = require("../../utils/getInput")(__dirname, { split: null });

const hashCache = new Map();
const hasher = (index) => {
  if (!hashCache.has(index)) {
    hashCache.set(index, createHash("md5").update(`${input}${index}`).digest("hex"));
  }
  return hashCache.get(index);
};

let keysFound = 0;
let currentIndex = 0;

while (true) {
  const hash = hasher(currentIndex);
  const re = /(.)\1\1/;
  const match = hash.match(re);
  if (match) {
    for (let i = currentIndex + 1; i < currentIndex + 1000; i++) {
      const newhash = hasher(i);
      if (newhash.includes(match[1].repeat(5))) {
        keysFound++;
        break;
      }
    }
  }
  if (keysFound === 64) break;
  currentIndex++;
}

console.log(currentIndex);
