const input = require("../../utils/getInput")(__dirname, {
  split: ",",
}).map((i) => parseFloat(i));

// this first implemenation worked only with part 1
const firstAttempt = (input, n) => {
  let list = [...input];
  while (list.length < n) {
    const lastItemIdx = list.length - 1;
    const lastItem = list[lastItemIdx];
    const lastItemPrevIdx = list.lastIndexOf(lastItem, lastItemIdx - 1);
    const isNew = lastItemPrevIdx === -1;
    list.push(isNew ? 0 : lastItemIdx - lastItemPrevIdx);
  }
  return list.pop();
};

// this second attempt worked with part 2, but it took 7min to execute
const secondAttempt = (input, n) => {
  const list = [...input];
  const cacheIdx = list.reduce(
    (acc, item, idx) => ({
      ...acc,
      [item]: idx,
    }),
    {}
  );

  while (list.length < n) {
    const lastIdx = list.length - 1;
    const lastItem = list[lastIdx];
    const previousIdx = cacheIdx[lastItem];

    list[list.length] = isNaN(previousIdx) ? 0 : lastIdx - previousIdx;
    cacheIdx[lastItem] = lastIdx;
  }
  return list.pop();
};

// same as the previous one but using a map it takes 5s to execute 😮
const final = (input, n) => {
  const list = [...input];
  const cacheMap = new Map();

  list.forEach((i, idx) => {
    cacheMap.set(i, idx);
  });

  while (list.length < n) {
    const lastIdx = list.length - 1;
    const lastItem = list[lastIdx];
    const previousIdx = cacheMap.get(lastItem);
    list[list.length] = isNaN(previousIdx) ? 0 : lastIdx - previousIdx;
    cacheMap.set(lastItem, lastIdx);
  }
  return list.pop();
};

console.log(final(input, 2020));
console.log(final(input, 30000000));
