const input = require("../../utils/getInput")(__dirname, { split: /(.+):/ });

// const input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`.split(/(.+):/);

const order = ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light", "light-to-temperature", "temperature-to-humidity", "humidity-to-location"];

// via https://youmightnotneed.com/lodash#chunk (my site, not cheating)
const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr];
  if (chunkSize <= 0) return cache;
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

const parseInput = (input) => {
  input = chunk(
    input.map((a) => a.trim()).filter((a) => !!a),
    2
  ).map(([key, data]) => [key.replace(" map", ""), data.split("\n").map((a) => a.split(" ").map(Number))]);

  const data = Object.fromEntries(input);
  data.seeds = data.seeds[0];
  return data;
};

const drillDown = ({ seeds, ...map }) => {
  return seeds.reduce((res, seed) => {
    let next = seed;
    res.push(
      order.reduce((next, key) => {
        for (const list of map[key]) {
          const [destStart, srcStart, length] = list;
          if (next >= srcStart && next < srcStart + length) {
            next = destStart + (next - srcStart);
            break;
          }
        }

        // console.log(key.split("-to-")[1], next);
        return next;
      }, next)
    );
    return res;
  }, []);
};

const data = parseInput(input);
console.log(Math.min(...drillDown(data)));
