// https://raw.githubusercontent.com/psalaets/line-intersect

module.exports = function checkIntersection(
  { x: x1, y: y1 },
  { x: x2, y: y2 },
  { x: x3, y: y3 },
  { x: x4, y: y4 }
) {
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  const numeA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  const numeB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  if (denom == 0) {
    if (numeA == 0 && numeB == 0) {
      return;
    }
    return;
  }

  const uA = numeA / denom;
  const uB = numeB / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return intersecting({
      x: x1 + uA * (x2 - x1),
      y: y1 + uA * (y2 - y1),
    });
  }

  return;
};

function intersecting(point) {
  return point;
}
