const input = require("../../utils/getInput")(__dirname, { split: null });

const dateRe = /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\]\s/;

const timeline = input
  .split("\n")
  .map((ln) => {
    const [str, date] = ln.match(dateRe);
    return {
      date: new Date(date),
      data: ln.replace(str, ""),
    };
  })
  .sort((a, b) => a.date - b.date);

const allGuards = timeline.reduce((guards, { date, data }) => {
  const [guard] = data.match(/(\d+)/) || [];
  if (guard) {
    guards.current = guard;
    guards[guards.current] = guards[guards.current] || [];
  } else {
    if (date.getHours() === 0) {
      if (data.startsWith("falls")) guards[guards.current].push([date.getMinutes()]);
      if (data.startsWith("wakes")) {
        guards[guards.current][guards[guards.current].length - 1].push(date.getMinutes() - 1);
      }
    }
  }

  return guards;
}, {});

delete allGuards.current;

const guardSleepTotal = Object.entries(allGuards).reduce((guards, [guard, sleepPtrn]) => {
  const sleepTotal = sleepPtrn.reduce((acc, sleep) => acc + sleep[1] - sleep[0], 0) + sleepPtrn.length;
  let minutes = [];

  for (let min = 0; min < 60; min++) {
    const total = allGuards[guard].reduce((counter, [lowerB, higherB]) => {
      if (min >= lowerB && min <= higherB) counter++;
      return counter;
    }, 0);
    minutes.push(total);
  }

  const highest = Math.max(...minutes);
  const bestMinute = minutes.findIndex((m) => m === highest);

  guards.push({ guard, sleepTotal, bestMinute, highest });

  return guards;
}, []);

console.log(guardSleepTotal);

const mostAsleep = guardSleepTotal.sort((a, b) => b.sleepTotal - a.sleepTotal)[0];
console.log(Number(mostAsleep.guard) * mostAsleep.bestMinute);
const mostAsleepInMinute = guardSleepTotal.sort((a, b) => b.highest - a.highest)[0];
console.log(Number(mostAsleepInMinute.guard) * mostAsleepInMinute.bestMinute);
