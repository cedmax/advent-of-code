const input = require("../../utils/getInput")(__dirname, {
  split: "mask = ",
}).filter((i) => i);

const applyMask = (str, mask) =>
  Object.entries(mask).reduce((str, [key, val]) => {
    if (val === "X") return str;
    const idx = parseFloat(key);
    return str.substring(0, idx) + val + str.substring(idx + 1);
  }, str);

const parse = (line) => {
  const parts = line.split("\n").filter((i) => i);
  const mask = parts
    .shift()
    .split("")
    .reduce(
      (acc, val, idx) => ({
        ...acc,
        [idx]: val,
      }),
      {}
    );

  return { mask, parts };
};

const getValues = (mem) => {
  const memParts = mem.split(" = ");
  const allocation = memParts[0].match(/(\d+)/)[0];

  return { allocation, value: memParts[1] };
};

const result = input.reduce((acc, line) => {
  const { parts, mask } = parse(line);
  const mem = parts.reduce((acc, mem) => {
    const { value, allocation } = getValues(mem);

    return {
      ...acc,
      [allocation]: parseInt(
        applyMask(parseInt(value, 10).toString(2).padStart(36, "0"), mask),
        2
      ),
    };
  }, {});

  return {
    ...acc,
    ...mem,
  };
}, {});

console.log(Object.values(result).reduce((a, b) => a + b, 0));

// utility method lifted from somewhere, didn't bother writing
const combine = (parts) =>
  parts
    .reduce((a, b) =>
      a.reduce((r, v) => r.concat(b.map((w) => [].concat(v, w))), [])
    )
    .reduce((a, b) => a.concat(b.join("")), []);

const applyMaskDiscardZeroes = (str, mask) =>
  Object.entries(mask).reduce((str, [key, val]) => {
    if (val === "0") return str;
    const idx = parseFloat(key);
    return str.substring(0, idx) + val + str.substring(idx + 1);
  }, str);

const applyMaskWithFloating = (num, mask) => {
  num = parseInt(num, 10).toString(2).padStart(36, "0");
  const numWithFloating = applyMaskDiscardZeroes(num, mask);

  const parts = numWithFloating.split("").reduce((result, part) => {
    const variants = [];

    if (part == "X") {
      variants.push(0);
      variants.push(1);
    } else {
      variants.push(part);
    }

    result.push(variants);
    return result;
  }, []);

  return combine(parts).map((num) => parseInt(num, 2));
};

const resultWFloating = input.reduce((acc, line) => {
  const { parts, mask } = parse(line);

  const mem = parts.reduce((acc, mem) => {
    const { value, allocation } = getValues(mem);
    const allocations = applyMaskWithFloating(allocation, mask);
    allocations.forEach(
      (allocation) => (acc[allocation] = parseInt(value, 10))
    );
    return acc;
  }, {});

  return {
    ...acc,
    ...mem,
  };
}, {});

console.log(Object.values(resultWFloating).reduce((a, b) => a + b, 0));
