const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

const [rawParts, text] = input;
const parts = rawParts.split("\n").reduce((map, ln) => {
  const [part, replacement] = ln.split(" => ");
  return [...map, [part, replacement]];
}, []);

const results = new Set();
for (let [part, replacement] of parts) {
  const re = new RegExp(`(${part})`, "g");
  const matches = [...text.matchAll(re)];
  matches.forEach(({ index }) => {
    results.add(
      text.substring(0, index) +
        replacement +
        text.substring(index + part.length)
    );
  });
}

console.log(results.size);
