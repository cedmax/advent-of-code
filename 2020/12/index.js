const input = require("../../utils/getInput")(__dirname, { split: "\n" })
  .map((line) => line.match(/([A-Z])(\d+)/))
  .map((arr) => [arr[1], parseInt(arr[2], 10)]);

const mapAxis = {
  N: ["y", +1],
  E: ["x", +1],
  S: ["y", -1],
  W: ["x", -1],
};
const directions = Object.keys(mapAxis);

const opsShipOnly = {
  F: (pos, value) => opsShipOnly.move(pos.facing, pos, value),
  R: (pos, value) => {
    const posShift = value / 90;
    const facingIdx =
      (directions.findIndex((d) => d === pos.facing) + posShift) %
      directions.length;

    return { ...pos, facing: directions[facingIdx] };
  },
  L: (pos, value) => {
    const posShift = value / 90;
    let facingIdx =
      (directions.findIndex((d) => d === pos.facing) - posShift) %
      directions.length;
    facingIdx = facingIdx < 0 ? directions.length + facingIdx : facingIdx;

    return { ...pos, facing: directions[facingIdx] };
  },
  move: (dir, pos, value) => ({
    ...pos,
    [mapAxis[dir][0]]: pos[mapAxis[dir][0]] + mapAxis[dir][1] * value,
  }),
};

const calc = (ops, initialPos) =>
  input.reduce((position, item) => {
    const op = ops[item[0]];
    return op ? op(position, item[1]) : ops.move(item[0], position, item[1]);
  }, initialPos);

const res = calc(opsShipOnly, { facing: "E", y: 0, x: 0 });
console.log(Math.abs(res.x) + Math.abs(res.y));

const opsWithWayPoint = {
  F: (pos, value) => ({
    ...pos,
    x: pos.x + pos.waypoint.x * value,
    y: pos.y + pos.waypoint.y * value,
  }),
  R: (pos, value) => {
    const angle = -(value * Math.PI) / 180;
    const { x, y } = pos.waypoint;

    return {
      ...pos,
      waypoint: {
        x: Math.round(Math.cos(angle) * x - Math.sin(angle) * y),
        y: Math.round(Math.sin(angle) * x + Math.cos(angle) * y),
      },
    };
  },
  L: (pos, value) => {
    const angle = (value * Math.PI) / 180;
    const { x, y } = pos.waypoint;

    return {
      ...pos,
      waypoint: {
        x: Math.round(Math.cos(angle) * x - Math.sin(angle) * y),
        y: Math.round(Math.sin(angle) * x + Math.cos(angle) * y),
      },
    };
  },
  move: (dir, pos, value) => ({
    ...pos,
    waypoint: {
      ...pos.waypoint,
      [mapAxis[dir][0]]:
        pos.waypoint[mapAxis[dir][0]] + mapAxis[dir][1] * value,
    },
  }),
};

const resW = calc(opsWithWayPoint, {
  y: 0,
  x: 0,
  waypoint: {
    x: 10,
    y: 1,
  },
});

console.log(Math.abs(resW.x) + Math.abs(resW.y));
