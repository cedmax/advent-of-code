const input = require("../../utils/getInput")(__dirname, { split: "" });

const getBlock = (seq, start, len) => seq.slice(start, len + start);

const findMarker = (seq, len) => {
  let start = 0;
  let block = getBlock(seq, start, len);

  while (block.length !== [...new Set(block)].length) {
    block = getBlock(seq, ++start, len);
  }
  return start + len;
};

console.log(findMarker(input, 4));
console.log(findMarker(input, 14));
