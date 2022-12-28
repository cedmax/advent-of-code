const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const re = /([a-z]+) (.) ([a-z]+)/;

const parse = (input) => {
  return Object.fromEntries(
    input.map((i) => {
      const [a, b] = i.split(": ");
      const result = [a];
      const matches = b.match(re);

      if (matches) {
        result.push({ left: matches[1], op: matches[2], right: matches[3] });
      } else {
        result.push(parseInt(b, 10));
      }

      return result;
    })
  );
};

const getValue = (data, key) => {
  const val = data[key];
  if (typeof val === "number") {
    return val;
  } else {
    return eval(`${getValue(data, val.left)} ${val.op} ${getValue(data, val.right)}`);
  }
};

const inputObj = parse(input);

console.log(getValue(inputObj, "root"));

const getValueForceHumn = (data, key, human) => {
  if (key === "humn" && typeof human === "number") {
    return human;
  }
  const val = data[key];

  if (typeof val === "number") {
    return val;
  } else {
    return eval(`${getValueForceHumn(data, val.left, human)} ${val.op} ${getValueForceHumn(data, val.right, human)}`);
  }
};

// this was manual 😅, tweaking the counter one
// digit at time in a binary search fashion
const getEquality = ({ root, ...data }) => {
  let counter = 3352886133831;

  left = getValueForceHumn(data, root.left, counter);
  right = getValueForceHumn(data, root.right, counter);
  console.log("\nfactor: ", counter, "\nleft:   ", left, "\nright:  ", right);

  return counter;
};

getEquality(inputObj);
