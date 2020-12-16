const input = require("../../utils/getInput")(__dirname, {
  split: "\n\n",
});

const parseRange = (ruleRange) => {
  const [min, max] = ruleRange.split("-").map(parseFloat);
  return (num) => num >= min && num <= max;
};

const rules = input[0].split("\n").reduce((rules, line) => {
  const ruleParts = line.match(/(.+): (\d+-\d+)+ or (\d+-\d+)+/);
  return {
    ...rules,
    [ruleParts[1]]: (num) =>
      parseRange(ruleParts[2])(num) || parseRange(ruleParts[3])(num),
  };
}, {});

const myTicket = input[1].split("\n")[1].split(",").map(parseFloat);
const otherTickets = input[2].split("\n").reduce((tickets, line, idx) => {
  if (idx > 0) tickets.push(line.split(",").map(parseFloat));
  return tickets;
}, []);

const result = otherTickets.reduce((result, ticket) => {
  return (
    result +
    ticket.reduce((acc, num) => {
      const passesAny = !!Object.values(rules).find((rule) => rule(num));
      return passesAny ? acc : acc + num;
    }, 0)
  );
}, 0);

console.log(result);

const discardInvalid = (otherTickets) =>
  otherTickets.filter((ticket) =>
    ticket.every((num) => !!Object.values(rules).find((rule) => rule(num)))
  );

const getFields = (tickets) =>
  tickets.reduce((result, ticket) => {
    ticket.forEach((num, i) => {
      result[i] = result[i] || [];
      result[i].push(num);
    });
    return result;
  }, []);

const findFieldNames = (tickets, rules) =>
  getFields(tickets).map((fieldSet) =>
    Object.keys(rules).filter((name) =>
      fieldSet.every((num) => rules[name](num))
    )
  );

const flatten = (arr) => arr.reduce((a, b) => a.concat(b), []);

const dedupeFieldNames = (duped, rules) => {
  const numOfRules = Object.keys(rules).length;
  const cache = [];
  while (flatten(duped).length !== numOfRules) {
    duped = duped.map((rules) => {
      if (rules.length === 1) {
        cache.push(rules[0]);
        return rules;
      }

      return rules.filter((x) => !cache.includes(x));
    });
  }

  return flatten(duped);
};

const validTickets = discardInvalid(otherTickets);
const duped = findFieldNames(validTickets, rules);
const fields = dedupeFieldNames(duped, rules);

console.log(
  myTicket.reduce((tot, num, idx) => {
    return fields[idx].startsWith("departure") ? tot * num : tot;
  }, 1)
);
