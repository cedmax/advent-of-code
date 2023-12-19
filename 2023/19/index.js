const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

// const input = `px{a<2006:qkq,m>2090:A,rfg}
// pv{a>1716:R,A}
// lnx{m>1548:A,A}
// rfg{s<537:gd,x>2440:R,A}
// qs{s>3448:A,lnx}
// qkq{x<1416:A,crn}
// crn{x>2662:A,R}
// in{s<1351:px,qqz}
// qqz{s>2770:qs,m<1801:hdj,R}
// gd{a>3333:R,R}
// hdj{m>838:A,pv}

// {x=787,m=2655,a=1222,s=2876}
// {x=1679,m=44,a=2067,s=496}
// {x=2036,m=264,a=79,s=2244}
// {x=2461,m=1339,a=466,s=291}
// {x=2127,m=1623,a=2188,s=1013}`.split("\n\n");

const getMatches = (a, re) => Array.from(a.matchAll(re)).map(({ groups }) => ({ ...groups }));

const ruleDefRe = /(?<label>[a-z]+)\{(?<rules>(.)+)\}/g;
const explodeRuleRe = /((?<key>[xmas])(?<sign>[\>\<])(?<value>[0-9]+):(?<dest>[^,]+),?)/g;
const defaultRe = /(?<default>[a-zA-z]+)$/g;
const parseRules = (input) => {
  const ruleLines = input.map((line) => getMatches(line, ruleDefRe)[0]);
  const rules = ruleLines.reduce((acc, { label, rules }) => {
    const defaultDest = getMatches(rules, defaultRe)[0].default;
    return {
      ...acc,
      [label]: {
        checks: [
          ...getMatches(rules, explodeRuleRe).map(({ key, sign, value, dest }) => eval(`(data) => (data.${key} ${sign} ${value}) ? '${dest}' : null`)),
          eval(`() => '${defaultDest}'`)
        ]
      }
    };
  }, {});
  return rules;
};

const partsDefRe = /(?<key>[xmas])=(?<value>[0-9]+)/gm;
const parseParts = (input) => input.map((line) => getMatches(line, partsDefRe).reduce((acc, { key, value }) => ({ ...acc, [key]: Number(value) }), {}));

const rules = parseRules(input[0].split("\n"));
const parts = parseParts(input[1].split("\n"));

const executeRule = (part, rules, start) => {
  const { checks } = rules[start];
  let next;
  for (const check of checks) {
    next = check(part);

    if (next === "A") return true;
    if (next === "R") return false;
    if (next) return executeRule(part, rules, next);
  }
};

const execute = (parts, rules) => parts.filter((part) => executeRule(part, rules, "in"));
const calculateResult = (parts) => parts.reduce((res, part) => res + Object.values(part).reduce((acc, v) => acc + v, 0), 0);

console.log(calculateResult(execute(parts, rules)));
