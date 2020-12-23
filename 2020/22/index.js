const input = require("../../utils/getInput")(__dirname, { split: "\n\n" }).map(
  (line) => {
    const lineSplit = line.split("\n");
    lineSplit.shift();
    return lineSplit.map(parseFloat);
  }
);

const playCombat = (decks) => {
  while (decks[0].length && decks[1].length) {
    const d1F = decks[0].shift();
    const d2F = decks[1].shift();

    if (d1F > d2F) {
      decks[0].push(d1F);
      decks[0].push(d2F);
    } else {
      decks[1].push(d2F);
      decks[1].push(d1F);
    }
  }
  return decks;
};

const game = playCombat(input);
const winner = game.find((i) => i.length);
const score = winner.reduce((acc, card, idx) => {
  return acc + card * (winner.length - idx);
}, 0);
console.log(score);
