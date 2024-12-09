const input = require("../../utils/getInput")(__dirname, { split: "" }).map(Number);

const parseData = (input) =>
  input.reduce((acc, num, idx) => {
    acc.push({ qty: num, val: idx % 2 ? "." : idx / 2 });

    return acc;
  }, []);

const calcResult = (data) => data.flatMap(({ qty, val }) => Array.from({ length: qty }, () => (val === "." ? 0 : val))).reduce((acc, val, idx) => acc + val * idx, 0);

const firstPart = (input) => {
  const data = parseData(input);

  for (let idx = 0; idx < data.length; idx++) {
    const current = data[idx];
    if (current.val === ".") {
      let { qty } = current;
      const lastItemIdx = data.findLastIndex(({ val }) => val !== ".");

      if (lastItemIdx < idx) {
        continue;
      }

      const lastItem = data.splice(lastItemIdx, 1)[0];

      if (lastItem.qty > qty) {
        data.splice(lastItemIdx, 0, { ...lastItem, qty: lastItem.qty - qty });
        data.splice(idx, 1, { ...lastItem, qty });
      } else if (lastItem.qty < qty) {
        data.splice(idx, 1, { val: ".", qty: qty - lastItem.qty });
        data.splice(idx, 0, lastItem);
      } else {
        data.splice(idx, 1, lastItem);
      }
    }
  }

  return calcResult(data);
};

console.log(firstPart(input));

const secondPart = (input) => {
  const data = parseData(input);

  for (let idx = 0; idx < data.length; idx++) {
    const current = data[idx];
    if (current.val === ".") {
      let { qty } = current;
      const lastItemIdx = data.findLastIndex(({ val, qty: lqty }) => val !== "." && lqty <= qty);

      if (lastItemIdx < idx) {
        continue;
      }

      const lastItem = data.splice(lastItemIdx, 1)[0];

      if (lastItem.qty > qty) {
      } else if (lastItem.qty < qty) {
        data.splice(lastItemIdx, 0, { qty: lastItem.qty, val: "." });
        data.splice(idx, 1, { val: ".", qty: qty - lastItem.qty });
        data.splice(idx, 0, lastItem);
      } else {
        data.splice(lastItemIdx, 0, { qty, val: "." });
        data.splice(idx, 1, lastItem);
      }
    }
  }

  return calcResult(data);
};

console.log(secondPart(input));
