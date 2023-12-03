const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`.split("\n");

const numRe = /\d+/g;
const tokenRe = /[^\d\.]{1}/g;

const getData = (input) => {
  const data = [];
  for (const [i, line] of input.entries()) {
    while ((match = numRe.exec(line)) != null) {
      data.push({ match: match[0], start: match.index, end: match.index + match[0].length - 1, line: i });
    }
  }

  return data;
};

const getTokens = (input) => {
  const tokens = [];
  for (const [i, line] of input.entries()) {
    while ((match = tokenRe.exec(line)) != null) {
      tokens.push({ match: match[0], idx: match.index, line: i });
    }
  }
  return tokens;
};

const isAdjecentY = (matchY, tokenY) => matchY <= tokenY + 1 && matchY >= tokenY - 1;
const isAdjecentX = (startX, endX, tokenX) => startX <= tokenX + 1 && endX >= tokenX - 1;

const sumAdjecents = (tokens, data) => {
  data = JSON.parse(JSON.stringify(data));
  tokens.forEach(({ idx: tokenX, line: tokenY }) => {
    data.forEach((item, i) => {
      if (isAdjecentX(item.start, item.end, tokenX) && isAdjecentY(item.line, tokenY)) {
        data[i].toAdd = true;
      }
    });
  });
  return data.reduce((acc, item) => (item.toAdd ? acc + Number(item.match) : acc), 0);
};

const data = getData(input);
const tokens = getTokens(input);

console.log(sumAdjecents(tokens, data));
