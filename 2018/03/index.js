const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map(
  (l) => {
    const [id, left, top, width, height] = l.split(/[@:x, ]+/);
    return {
      id,
      left: parseInt(left, 10),
      top: parseInt(top, 10),
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    };
  }
);

const map = [...new Array(1000).keys()].map((i) =>
  [...new Array(1000).keys()].fill(0)
);

input.forEach(({ top, left, width, height }) => {
  for (let y = top; y < top + height; y++) {
    for (let x = left; x < left + width; x++) {
      map[x][y]++;
    }
  }
});

console.log(map.reduce((a, b) => a.concat(b), []).filter((a) => a > 1).length);

input.forEach(({ id, top, left, width, height }) => {
  let moreThanOne = false;

  for (let y = top; y < top + height; y++) {
    for (let x = left; x < left + width; x++) {
      if (map[x][y] > 1) {
        moreThanOne = true;
      }
    }
  }

  if (!moreThanOne) {
    console.log(id);
  }
});
