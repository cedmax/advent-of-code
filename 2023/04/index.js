const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n");

const parseNumbers = (numString) => numString.trim().split(/\s+/g).map(Number);

const parseInput = (input) => {
  return input.reduce((acc, line) => {
    const tokens = line.split(/[:|]/g);
    acc.push({
      winners: parseNumbers(tokens[1]),
      numbers: parseNumbers(tokens[2]),
      copies: 1
    });
    return acc;
  }, []);
};

const parsedInput = parseInput(input);

const firstPart = (input) => {
  return input.reduce((acc, { winners, numbers }) => {
    const cardTotal = winners.reduce((cardAcc, winner) => {
      const winnerMatches = numbers.filter((n) => n === winner);
      winnerMatches.forEach(() => {
        cardAcc = !cardAcc ? 1 : cardAcc * 2;
      });

      return cardAcc;
    }, 0);
    return acc + cardTotal;
  }, 0);
};

console.log(firstPart(parsedInput));

const secondPart = (input) => {
  input = JSON.parse(JSON.stringify(input));

  input.forEach(({ winners, numbers, copies }, cardIdx) => {
    while (copies) {
      let current = cardIdx;
      winners.forEach((winner) => {
        const winnerMatches = numbers.filter((n) => n === winner);
        winnerMatches.forEach(() => {
          ++current;
          input[current].copies = input[current].copies + 1;
        });
      });
      copies--;
    }
  });

  return input.reduce((acc, { copies }) => acc + copies, 0);
};

console.log(secondPart(parsedInput));
