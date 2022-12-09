const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const actions = {
  L: ({ x, y }) => ({ x: x - 1, y }),
  R: ({ x, y }) => ({ x: x + 1, y }),
  U: ({ x, y }) => ({ x, y: y - 1 }),
  D: ({ x, y }) => ({ x, y: y + 1 })
};

const follow = ({ x: xh, y: yh }, { x: xt, y: yt }) => {
  const hDist = Math.abs(xh - xt);
  const vDist = Math.abs(yh - yt);
  const hSign = Math.sign(xh - xt);
  const vSign = Math.sign(yh - yt);

  if (vDist > 1 || hDist > 1) {
    xt = hDist > 1 ? xt + hSign : xh;
    yt = vDist > 1 ? yt + vSign : yh;
  }

  return { x: xt, y: yt };
};

const countTailCoords = (ops, numOfKnots) => {
  const knots = Array.from(Array(numOfKnots)).map(() => ({ x: 0, y: 0 }));

  return ops.reduce((history, op) => {
    const [dir, steps] = op.split(" ");
    const movement = Array.from(Array(parseInt(steps, 10)));

    movement.forEach(() => {
      knots[0] = actions[dir](knots[0]);

      for (let i = 1; i < knots.length; i++) {
        knots[i] = follow(knots[i - 1], knots[i]);
      }

      const { x, y } = knots[knots.length - 1];
      history.add(`${x}_${y}`);
    });

    return history;
  }, new Set()).size;
};

console.log(countTailCoords(input, 2));
console.log(countTailCoords(input, 10));
