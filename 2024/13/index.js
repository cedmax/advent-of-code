const input = require("../../utils/getInput")(__dirname, { split: "\n\n" });

const parse = (input) =>
  input.map((block) => {
    const [[ax], [ay], [bx], [by], [tx], [ty]] = [...block.matchAll(/\d+/g)];
    return {
      A: { x: Number(ax), y: Number(ay) },
      B: { x: Number(bx), y: Number(by) },
      T: { x: Number(tx), y: Number(ty) }
    };
  });

// The effing math
// Aclicks = (x - B.x * Bclicks) / A.x ;
// Aclicks = (y - B.y * Bclicks) / A.y ;
// Bclicks = (x - A.x * Aclicks) / B.x ;
// Bclicks = (y - A.y * Aclicks) / B.y ;

const calculateResult = ({ T, A, B }) => {
  let { x, y } = T;

  const Aclicks = (x * B.y - y * B.x) / (A.x * B.y - A.y * B.x);
  const Bclicks = (x * A.y - y * A.x) / (B.x * A.y - B.y * A.x);

  return Number.isInteger(Aclicks) && Number.isInteger(Bclicks) ? Aclicks * 3 + Bclicks : 0;
};

console.log(
  parse(input)
    .map(calculateResult)
    .reduce((a, b) => a + b, 0)
);

const increaseT =
  (func) =>
  ({ T: { x, y }, A, B }) =>
    func({ T: { x: x + 10000000000000, y: y + 10000000000000 }, A, B });

console.log(
  parse(input)
    .map(increaseT(calculateResult))
    .reduce((a, b) => a + b, 0)
);

/**
 * obviously I first tried bruteforcing my way through the exercise,
 * fine for the first part, as you'd expect not for the second
 * */

// const validate = (T, A) => T.x % A.x === 0 && T.y % A.y === 0 && T.x / A.x === T.y / A.y;

// const getResult = ({ T: { x, y }, A, B }) => {
//   // worst case scenario, I can press only A
//   let pressing = [validate({ x, y }, A) && x / A.x, 0];
//   const endLoop = Math.max(Math.floor(x / B.x), Math.floor(y / B.y));
//   for (let i = 0; i < endLoop; i++) {
//     //press B
//     x = x - B.x;
//     y = y - B.y;
//     // I went too far, there's no solution that works with pressing B
//     if (x < 0 || y < 0) {
//       break;
//     }
//     if (validate({ x, y }, A)) {
//       pressing = [x / A.x, i + 1];
//     }
//   }
//   let [a, b] = pressing;
//   return a * 3 + b;
// };

// console.log(
//   parse(input)
//     .map(getResult)
//     .reduce((a, b) => a + b, 0)
// );
