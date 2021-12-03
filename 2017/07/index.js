const input = require("../../utils/getInput")(__dirname, {
  split: "\n"
});
// const input = `pbga (66)
// xhth (57)
// ebii (61)
// havc (66)
// ktlj (57)
// fwft (72) -> ktlj, cntj, xhth
// qoyq (66)
// padx (45) -> pbga, havc, qoyq
// tknk (41) -> ugml, padx, fwft
// jptl (61)
// ugml (68) -> gyxo, ebii, jptl
// gyxo (61)
// cntj (57)`.split('\n')

const inputsSupporting = input
  .filter((i) => i.includes(`->`))
  .reduce(
    (acc, tower) => {
      const towerData = tower.split(" -> ");
      const towerHolder = towerData[0].split(" ")[0];
      const towerHeld = towerData[1].split(", ");
      acc.keys.push(towerHolder);
      acc.held = acc.held.concat(towerHeld);
      return acc;
    },
    { keys: [], held: [] }
  );

var holder = inputsSupporting.keys.filter((e) => !inputsSupporting.held.includes(e));
console.log(holder);

const inpW = input.reduce((acc, tower) => {
  const weight = parseInt(tower.match(/(\d+)/)[0], 10);
  const name = tower.split(" (")[0];
  const held = tower.split(" -> ")[1];
  const data = { weight, name, originalWeight: weight };

  if (held) {
    data.held = held.split(", ");
  }
  acc.push(data);
  return acc;
}, []);

const resolveHolder = (all, name) => {
  const index = all.findIndex((i) => i.name == name);

  if (all[index].held) {
    all[index].held = all[index].held.map((name) => {
      return resolveHolder(all, name);
    });
    const sumall = all[index].held.reduce((acc, item) => acc + item.weight, 0);
    if (sumall / all[index].held.length === all[index].held[0].weight) {
      all[index].weight = all[index].weight + sumall;
    } else {
      const allWeights = all[index].held.map((item) => item.weight);
      const differentIdx = allWeights.findIndex((a) => {
        return allWeights.indexOf(a) == allWeights.lastIndexOf(a);
      });

      const anotherIdx = differentIdx - 1 != -1 ? differentIdx - 1 : 1;
      const adjust = allWeights[differentIdx] - allWeights[anotherIdx];
      console.log(all[index].held[differentIdx].originalWeight - adjust);
      process.exit(0);
    }
    //const sumall = all[index].held.reduce((acc, item) => acc + item.weight)
    //console.log(name, sumall)
  }
  return all[index];
};

resolveHolder([...inpW], holder);

//console.log()

// while (Object.keys(inpW).map(key => inpuW).filter())

// Object.keys(inpW).forEach(tower => {
//    console.log(inpW[tower])
//    if (inpW[tower].held) {
//       inpW[tower].held = inpW[tower].held.map(name => ({[name]: inpW[name].weight}))
//    }
// })
