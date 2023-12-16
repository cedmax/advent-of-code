const input = require("../../utils/getInput")(__dirname, { split: "," });

// const input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7".split(",");

const getValue = (arr) =>
  arr.reduce((acc, chr, index) => {
    acc += chr.charCodeAt(0);
    return (acc * 17) % 256;
  }, 0);

const part1 = (input) => {
  return input
    .map((a) => a.split(""))
    .reduce((acc, arr) => {
      return acc + getValue(arr);
    }, 0);
};

// my site, not cheating https://youmightnotneed.com/lodash#unionBy
const uniqBy = (arr, iteratee) => {
  if (typeof iteratee === "string") {
    const prop = iteratee;
    iteratee = (item) => item[prop];
  }

  return arr.filter((x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)));
};

const mapCommands = (instruction) => {
  const label = /([a-zA-Z]+)/g.exec(instruction)[0];
  const command = /(-|=)+/g.exec(instruction)[0];
  const valueMatch = /([0-9]+)/g.exec(instruction);
  const value = valueMatch ? valueMatch[0] : null;
  const idx = getValue(label.split(""));

  return { idx, label, command, value };
};

const fillMap = (input) => {
  const hashMap = Array.from(Array(256)).map(() => []);
  input.forEach(({ idx, label, command, value }) => {
    const findLabelAtIdx = hashMap[idx].findIndex((item) => item[label]);
    if (command == "=") {
      if (findLabelAtIdx > -1) {
        hashMap[idx][findLabelAtIdx] = { [label]: value };
      } else {
        hashMap[idx].push({ [label]: value });
      }
    } else {
      if (findLabelAtIdx > -1) {
        hashMap[idx].splice(findLabelAtIdx, 1);
      }
    }
  });
  return hashMap;
};

const part2 = (input) => {
  const hashMap = fillMap(input);
  const uniqueLabels = uniqBy(input, "label").map(({ label, idx }) => ({
    idx,
    label
  }));

  return uniqueLabels.reduce((acc, { idx, label }) => {
    const findLabelAtIdx = hashMap[idx].findIndex((item) => item[label]);
    if (hashMap[idx][findLabelAtIdx]) {
      acc += (idx + 1) * (findLabelAtIdx + 1) * Number(hashMap[idx][findLabelAtIdx][label]);
    }

    return acc;
  }, 0);
};

console.log(part1(input));
console.log(part2(input.map(mapCommands)));
