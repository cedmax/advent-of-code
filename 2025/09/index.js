const input = require("../../utils/getInput")(__dirname, { split: "\n" }).map((ln) => ln.split(",").map(parseFloat));

// part1
const sizes = [];
for (let i = 0; i < input.length; i++) {
  for (j = 1; j < input.length; j++) {
    const width = Math.abs(input[i][0] - input[j][0]) + 1;
    const height = Math.abs(input[i][1] - input[j][1]) + 1;

    sizes.push(width * height);
  }
}

sizes.sort((a, b) => b - a);
console.log(sizes[0]);

// part2

// from: https://stackoverflow.com/a/24392281
function intersects([x1, y1], [x2, y2], [x3, y3], [x4, y4]) {
  const det = (x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1);
  if (det === 0) {
    return false;
  } else {
    const lambda = ((y4 - y3) * (x4 - x1) + (x3 - x4) * (y4 - y1)) / det;
    const gamma = ((y1 - y2) * (x4 - x1) + (x2 - x1) * (y4 - y1)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}

/// from: https://stackoverflow.com/a/29915728
function inside([x, y], vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const [xi, yi] = vs[i];
    const [xj, yj] = vs[j];

    const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

const sorted = [input.shift()];
while (input.length) {
  const lastAdded = sorted[sorted.length - 1];
  const nextIdx = input.findIndex(([x, y]) => lastAdded[0] === x || lastAdded[1] === y);
  sorted.push(input[nextIdx]);
  input.splice(nextIdx, 1);
}

const sizesInside = [];
for (let i = 0; i < sorted.length; i++) {
  for (let j = 1; j < sorted.length; j++) {
    let intersect = false;
    const corner1 = [sorted[i][0], sorted[i][1]];
    const corner2 = [sorted[j][0], sorted[j][1]];
    const corner3 = [sorted[j][0], sorted[i][1]];
    const corner4 = [sorted[i][0], sorted[j][1]];

    if (!inside(corner3, sorted) || !inside(corner4, sorted)) {
      continue;
    }

    for (let w = 1; w < sorted.length; w++) {
      const point1 = sorted[w - 1];
      const point2 = sorted[w];

      if (
        intersects(corner1, corner2, point1, point2) ||
        intersects(corner2, corner3, point1, point2) ||
        intersects(corner3, corner4, point1, point2) ||
        intersects(corner4, corner1, point1, point2)
      ) {
        intersect = true;
        break;
      }
    }

    if (!intersect) {
      const width = Math.abs(sorted[i][0] - sorted[j][0]) + 1;
      const height = Math.abs(sorted[i][1] - sorted[j][1]) + 1;
      sizesInside.push(width * height);
    }
  }
}

sizesInside.sort((a, b) => b - a);
console.log(sizesInside[0]);
