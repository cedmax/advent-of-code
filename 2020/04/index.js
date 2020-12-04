const input = require("../../utils/getInput")(__dirname, { split: "\n\n" }).map(
  (psp) =>
    psp.split(/\s/).reduce(
      (acc, item) => ({
        ...acc,
        [item.split(":")[0]]: item.split(":")[1],
      }),
      {}
    )
);

const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const filteredInput = input.filter(
  (psp) => !required.filter((x) => !Object.keys(psp).includes(x)).length
);

console.log(filteredInput.length);

const rules = {
  cm: (n) => n >= 150 && n <= 193,
  in: (n) => n >= 59 && n <= 76,
  byr: (n) => n >= 1920 && n <= 2002,
  iyr: (n) => n >= 2010 && n <= 2020,
  eyr: (n) => n >= 2020 && n <= 2030,
  hgt: (ht) => {
    const isMatch = ht.match(/^(\d+)(cm|in)$/) || false;
    return isMatch && rules[isMatch[2]](parseInt(isMatch[1], 10));
  },
  hcl: (c) => !!c.match(/^#([\da-f]){6}$/),
  ecl: (c) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(c),
  pid: (n) => !!n.match(/^([0-9]){9}$/),
  cid: () => true,
};

const validated = filteredInput.filter(
  (psp) =>
    !Object.entries(psp)
      .map(([key, value]) => rules[key](value))
      .includes(false)
);

console.log(validated.length);
