const input = require("../../utils/getInput")(__dirname, { split: "\n" }).reduce((acc, ln) => {
  const [key, rest] = ln.split(": ");
  const dest = rest.split(" ");
  acc[key] = dest;
  return acc;
}, {});

// const input = `svr: aaa bbb
// aaa: fft
// fft: ccc
// bbb: tty
// tty: ccc
// ccc: ddd eee
// ddd: hub
// hub: fff
// eee: dac
// dac: fff
// fff: ggg hhh
// ggg: out
// hhh: out`
//   .split("\n")
//   .reduce((acc, ln) => {
//     const [key, rest] = ln.split(": ");
//     const dest = rest.split(" ");
//     acc[key] = dest;
//     return acc;
//   }, {});

function countPaths(input, start) {
  const totals = {};
  const paths = [{ key: start, count: 1, currentPath: input[start] }];

  while (paths.length) {
    const { key, count } = paths.pop();
    totals[key] = (totals[key] || 0) + count;

    const followup = input[key] || [];
    for (const next of followup) {
      paths.push({ key: next, count });
    }
  }

  return totals;
}

console.log(countPaths(input, "you").out);

// function buildPaths(input, start) {
//   const nodes = [{ key: start, next: input[start] }];

//   let paths = [[start]];
//   while (nodes.length) {
//     const { key, next } = nodes.pop();
//     for (const newKey of next) {
//       if (key === "out") continue;
//       let newpaths = paths;
//       for (let i = 0; i < paths.length; i++) {
//         if (paths[i].includes("dac") && !paths[i].includes("fft")) {
//           newpaths.splice(i, 1);
//           continue;
//         } else if (paths[i][paths[i].length - 1] === key) {
//           newpaths.splice(i, 1, ...next.map((nextKey) => [...paths[i], nextKey]));
//         }
//       }
//       paths = newpaths;
//       console.log(paths.length);
//       nodes.push({ key: newKey, next: input[newKey] ?? [] });
//     }
//   }
//   return paths;
// }

// const matchRe = /fft.+dac/;
// console.log(
//   buildPaths(input, "svr").filter((arr) => {
//     const str = arr.join(",");
//     return str.match(matchRe);
//   }).length
// );
