const input = require("../../utils/getInput")(__dirname, { split: null });

// const input = `............
// ........0...
// .....0......
// .......0....
// ....0.......
// ......A.....
// ............
// ............
// ........A...
// .........A..
// ............
// ............`;

const lineLength = input.split("\n")[0].length;
const inputInlined = input.replace(/\n/g, "");
const allTypes = Array.from(new Set(inputInlined.match(/[^.]/g)));

const findAllIndexes = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

const getAllCombos = function (array, n) {
  let recur = (array, n) => {
    if (--n < 0) {
      return [[]];
    }
    let combinations = [];
    array = array.slice();
    while (array.length) {
      let value = array[0];
      recur(array, n).forEach((combination) => {
        combination.unshift(value);
        combinations.push(combination);
      });
      array.shift();
    }
    return combinations;
  };
  return recur(array, n);
};

const antennaCoords = allTypes.reduce((res, type) => {
  res[type] = findAllIndexes(inputInlined.split(""), type).map((idx) => {
    const y = Math.floor(idx / lineLength);
    return [idx - y * lineLength, y];
  });
  return res;
}, {});

const comboCoords = Object.entries(antennaCoords).reduce((res, [type, coords]) => {
  // get all the combos of 2 different antennas
  res[type] = getAllCombos(coords, 2).filter((combo) => JSON.stringify(combo[0]) !== JSON.stringify(combo[1]));
  return res;
}, {});

const isInBounds = ([x, y]) => x < lineLength && y < input.split("\n").length && x > -1 && y > -1;

const firstPart = Object.entries(comboCoords).reduce((res, [_, coords]) => {
  coords.forEach((coordSet) => {
    const [[x1, y1], [x2, y2]] = coordSet;

    const [dx, dy] = [Math.abs(x1 - x2), Math.abs(y1 - y2)];

    const antinode1 = [x1 > x2 ? x1 + dx : x1 - dx, y1 > y2 ? y1 + dy : y1 - dy];
    const antinode2 = [x1 > x2 ? x2 - dx : x2 + dx, y1 > y2 ? y2 - dy : y2 + dy];

    if (isInBounds(antinode1)) res.push(antinode1);
    if (isInBounds(antinode2)) res.push(antinode2);
  });
  return res;
}, []);

const firstPartUnique = new Set(firstPart.map((a) => JSON.stringify(a)));

console.log(firstPartUnique.size);

const secondPart = Object.entries(comboCoords).reduce((res, [_, coords]) => {
  coords.forEach((coordSet) => {
    const [[x1, y1], [x2, y2]] = coordSet;

    const [dx, dy] = [Math.abs(x1 - x2), Math.abs(y1 - y2)];

    const antinodes1 = [[x1 > x2 ? x1 + dx : x1 - dx, y1 > y2 ? y1 + dy : y1 - dy]];
    const antinodes2 = [[x1 > x2 ? x2 - dx : x2 + dx, y1 > y2 ? y2 - dy : y2 + dy]];

    while (isInBounds(antinodes1[antinodes1.length - 1]) || isInBounds(antinodes2[antinodes2.length - 1])) {
      const [xa1, ya1] = antinodes1[antinodes1.length - 1];
      const [xa2, ya2] = antinodes2[antinodes2.length - 1];
      antinodes1.push([xa1 > xa2 ? xa1 + dx : xa1 - dx, ya1 > ya2 ? ya1 + dy : ya1 - dy]);
      antinodes2.push([xa1 > xa2 ? xa2 - dx : xa2 + dx, ya1 > ya2 ? ya2 - dy : ya2 + dy]);
    }
    const res1 = antinodes1.filter(isInBounds);
    const res2 = antinodes2.filter(isInBounds);

    // I need to add the coordSet because of this:
    // "frequency antennas are all exactly in line with
    // two antennas, so they are all also antinodes"
    res = [...res, ...coordSet, ...res1, ...res2];
  });
  return res;
}, []);

// const grid = input.split("\n").map((a) => a.split(""));
// secondPart.forEach(([x, y]) => {
//   grid[y][x] = grid[y][x] === "." ? "#" : grid[y][x];
// });
// console.log(grid.map((a) => a.join("")).join("\n"));

const secondPartUnique = new Set(secondPart.map((a) => JSON.stringify(a)));

console.log(secondPartUnique.size);
