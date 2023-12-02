const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n");

const normalise = (color) => (line) => {
  return Number(line.replace(color, "").trim());
};

const parseHand = (colors, hand) =>
  colors.reduce((acc, color) => {
    acc[color] =
      hand
        .match(new RegExp(`(\\d+) ${color}`, "g"))
        ?.map(normalise(color))
        .reduce((acc, num) => acc + num, 0) || 0;
    return acc;
  }, {});

const limits = {
  red: 12,
  green: 13,
  blue: 14
};

const firstPart = (input) => {
  const colors = Object.keys(limits);

  return input.reduce((acc, line, i) => {
    const hands = line.split(";");

    for (const hand of hands) {
      const handResult = parseHand(colors, hand);

      if (colors.some((color) => handResult[color] > limits[color])) {
        return acc;
      }
    }

    return acc + Number(i + 1);
  }, 0);
};

console.log(firstPart(input));

const secondPart = (input) => {
  const colors = Object.keys(limits);

  return input.reduce((acc, line) => {
    const hands = line.split(";");

    const max = hands.reduce((maxCache, hand) => {
      const handResult = parseHand(colors, hand);

      return Object.entries(handResult).reduce((acc, [key, value]) => {
        acc[key] = Math.max(acc[key] || 0, value);

        return acc;
      }, maxCache);
    }, {});

    return acc + Object.values(max).reduce((acc, num) => acc * (num || 1), 1);
  }, 0);
};

console.log(secondPart(input));
