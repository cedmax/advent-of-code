const input = require("../../utils/getInput")(__dirname, { split: null });

// const example1 = "R2, L3";
// const example2 = "R2, R2, R2";
// const example3 = "R5, L5, R5, R3";
// const example4 = "R8, R4, R4, R8";

const instr = input.split(", ").map((a) => {
  const d = a.match(/[L|R]/)[0];
  const v = a.match(/\d+/g)[0];
  return [d, Number(v)];
});

const direction = (facing, instruction) => {
  const [side, value] = instruction;
  const base = {
    axis: ["N", "S"].includes(facing) ? "x" : "y",
    value: Number(value),
  };

  if (facing === "N") {
    base.sign = side === "R" ? +1 : -1;
    base.nextFacing = side === "R" ? "E" : "W";
  }
  if (facing === "S") {
    base.sign = side === "R" ? -1 : +1;
    base.nextFacing = side === "R" ? "W" : "E";
  }
  if (facing === "E") {
    base.sign = side === "R" ? +1 : -1;
    base.nextFacing = side === "R" ? "S" : "N";
  }
  if (facing === "W") {
    base.sign = side === "R" ? -1 : +1;
    base.nextFacing = side === "R" ? "N" : "S";
  }

  return base;
};

const getSteps = (instr, step2) =>
  instr.reduce(
    (acc, instr) => {
      const { axis, sign, value, nextFacing } = direction(acc.facing, instr);

      acc.facing = nextFacing;

      const valueToReach = acc.coords[axis] + value * sign;
      if (step2) {
        while (acc.coords[axis] !== valueToReach) {
          acc.coords[axis] = acc.coords[axis] + sign;
          if (acc.cache.find((a) => a === JSON.stringify(acc.coords))) {
            throw new Error(Math.abs(acc.coords.x) + Math.abs(acc.coords.y));
          }
          acc.cache.push(JSON.stringify(acc.coords));
        }
      } else {
        acc.coords[axis] = valueToReach;
      }

      return acc;
    },
    { facing: "N", coords: { x: 0, y: 0 }, cache: [], part2: null }
  );

const steps = getSteps(instr);
console.log(Math.abs(steps.coords.x) + Math.abs(steps.coords.y));

try {
  getSteps(instr, true);
} catch (e) {
  console.log(Number(e.message));
}
