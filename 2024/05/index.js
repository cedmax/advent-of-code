const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

const rules = input[0]
  .split("\n")
  .map((line) => line.split("|").map((i) => Number(i)))
  .reduce((ruleset, current) => {
    const [left, right] = current;
    ruleset[left] = ruleset[left] || { shouldFollow: [], shouldPrecede: [] };
    ruleset[right] = ruleset[right] || { shouldFollow: [], shouldPrecede: [] };
    ruleset[left].shouldPrecede.push(right);
    ruleset[right].shouldFollow.push(left);
    return ruleset;
  }, {});

const sequences = input[1].split("\n").map((line) => line.split(",").map((i) => Number(i)));

const wrongFollow = (shouldFollow, seq, idx) => shouldFollow?.some((r) => seq.slice(idx + 1).includes(r));
const wrongPrecede = (shouldPrecede, seq, idx) => shouldPrecede?.some((r) => seq.slice(0, idx).includes(r));

const isSequenceCorrect = (seq) => {
  for (let idx = 0; idx < seq.length; idx++) {
    const { shouldFollow, shouldPrecede } = rules[seq[idx]];

    if (wrongFollow(shouldFollow, seq, idx) || wrongPrecede(shouldPrecede, seq, idx)) {
      return false;
    }
  }
  return true;
};

const [correct, incorrect] = sequences.reduce(
  (acc, seq) => {
    isSequenceCorrect(seq) ? acc[0].push(seq) : acc[1].push(seq);
    return acc;
  },
  [[], []]
);

const calculate = (seq) => seq.reduce((acc, line) => acc + line[Math.floor(line.length / 2)], 0);

console.log(calculate(correct));

const fixIncorrect = (seq) => {
  while (!isSequenceCorrect(seq)) {
    for (let idx = 0; idx < seq.length; idx++) {
      const { shouldFollow, shouldPrecede } = rules[seq[idx]];

      if (wrongFollow(shouldFollow, seq, idx)) {
        const tmpSeq = [...seq];
        tmpSeq.splice(idx, 1);
        tmpSeq.splice(idx + 1, 0, seq[idx]);

        seq = tmpSeq;
      } else if (wrongPrecede(shouldPrecede, seq, idx)) {
        const tmpSeq = [...seq];
        tmpSeq.splice(idx, 1);
        tmpSeq.splice(idx - 1, 0, seq[idx]);
        seq = tmpSeq;
      }
    }
  }
  return seq;
};

console.log(calculate(incorrect.map(fixIncorrect)));
