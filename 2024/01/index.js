const input = require("../../utils/getInput")(__dirname, { split: "\n" }).reduce(
  (acc, line) => {
    const { left, right } = acc;
    const [valLeft, valRight] = line.split("   ");

    left.push(Number(valLeft));
    right.push(Number(valRight));

    return { left, right };
  },
  { left: [], right: [] }
);

const sortLeft = input.left.sort((a, b) => a - b);
const sortRight = input.right.sort((a, b) => a - b);

const distances = sortLeft.map((val, idx) => Math.abs(sortRight[idx] - val)).reduce((a, b) => a + b, 0);

console.log(distances);

const similarity = input.left.reduce((acc, val) => acc + val * input.right.filter((a) => a === val).length, 0);

console.log(similarity);
