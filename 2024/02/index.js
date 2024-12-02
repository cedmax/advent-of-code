const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((a) => a.split(" ").map(Number));

const testSequence = (entries) => {
  const sign = Math.sign(entries[1] - entries[0]);

  return entries.reduce((acc, current, i) => {
    const next = entries[i + 1];

    if (next) {
      const diff = next - current;

      if (Math.abs(diff) > 3 || Math.sign(diff) !== sign) {
        acc = false;
      }
    }

    return acc;
  }, true);
};

console.log(input.map(testSequence).filter((a) => a).length);

const safe = input.map((entries) =>
  entries.reduce((res, _, i) => {
    if (res) return res;

    const entriesClone = [...entries];
    entriesClone.splice(i, 1);

    return testSequence(entriesClone);
  }, false)
);

console.log(safe.filter((a) => a).length);
