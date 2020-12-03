const input = require("../../utils/getInput")(__dirname, {
  split: "\n",
})
  .map((line) =>
    /([A-Za-z]+) would (gain|lose) (\d+) happiness units by sitting next to ([A-Za-z]+)./.exec(
      line
    )
  )
  .reduce((acc, [input, subject, verb, qty, object]) => {
    if (!acc[subject]) {
      acc[subject] = {};
    }

    acc[subject][object] = (verb === "gain" ? 1 : -1) * qty;
    return acc;
  }, {});

const names = Object.keys(input);

function permutation(array) {
  function p(array, temp) {
    var i, x;
    if (!array.length) {
      result.push(temp);
    }
    for (i = 0; i < array.length; i++) {
      x = array.splice(i, 1)[0];
      p(array, temp.concat(x));
      array.splice(i, 0, x);
    }
  }

  var result = [];
  p(array, []);
  return result;
}

const calculate = (line, i) => {
  return line.reduce((acc, name, i) => {
    const nextName = line[i + 1] || line[0];
    acc = acc + ((input[name] && input[name][nextName]) || 0);
    acc = acc + ((input[nextName] && input[nextName][name]) || 0);
    return acc;
  }, 0);
};

const totals = permutation(names).map(calculate);

console.log(Math.max(...totals));

const newNames = [...names, "me"];
const newTotals = permutation(newNames).map(calculate);

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

const chunked = chunk(newTotals, 1500).map((items) => Math.max(...items));

console.log(Math.max(...chunked));
