const input = require("../../utils/getInput")(__dirname, { split: "\n" });

// const input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`.split("\n");

const handPriority = ["Five of a kind", "Four of a kind", "Full house", "Three of a kind", "Two pair", "One pair", "High card"];
const cardPriority = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

const cardDist = (arr) =>
  arr.reduce((accumulator, value) => {
    return {
      ...accumulator,
      [value]: (accumulator[value] || 0) + 1
    };
  }, {});

const compare = (hand, expected) => !!Object.values(hand).filter((count) => count === expected).length;
const doublePairs = (hand) => Object.values(hand).filter((count) => count === 2).length === 2;

const map = {
  "Five of a kind": (hand) => compare(hand, 5),
  "Four of a kind": (hand) => compare(hand, 4),
  "Full house": (hand) => compare(hand, 3) && compare(hand, 2),
  "Three of a kind": (hand) => compare(hand, 3),
  "Two pair": (hand) => doublePairs(hand),
  "One pair": (hand) => compare(hand, 2),
  "High card": () => true
};

const calcHandResult = (mapObj, hand) => handPriority.findIndex((priorityKey) => priorityKey === handPriority.filter((key) => mapObj[key](cardDist(hand)))[0]);

const calcHands = (hands, { map, cardPriority }) => {
  const ordered = hands.sort((handDescrA, handDescrB) => {
    const handA = handDescrA.split(" ")[0].split("");
    const handB = handDescrB.split(" ")[0].split("");

    const handAPriority = calcHandResult(map, handA);
    const handBPriority = calcHandResult(map, handB);

    if (handAPriority === handBPriority) {
      const handACardValues = handA.map((card) => cardPriority.indexOf(card));
      const handBCardValues = handB.map((card) => cardPriority.indexOf(card));
      do {
        let firstCardA = handACardValues.shift();
        let firstCardB = handBCardValues.shift();
        if (firstCardA !== firstCardB) {
          return firstCardB - firstCardA;
        }
      } while (true);
    }
    return handBPriority - handAPriority;
  });

  return ordered.reduce((acc, hand, i) => {
    return acc + Number(hand.split(" ")[1]) * (i + 1);
  }, 0);
};

console.log(calcHands(input, { map: map, cardPriority: cardPriority }));

const cardPriorityWJoker = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const compareS2 = (hand, expected) => !!Object.entries(hand).filter(([key, count]) => count === expected - (hand.J || 0) && key !== "J").length;

const mapWJoker = {
  "Five of a kind": (hand) => compareS2(hand, 5) || hand.J === 5,
  "Four of a kind": (hand) => compareS2(hand, 4),
  "Full house": (hand) => map["Full house"](hand) || (doublePairs(hand) && hand.J === 1),
  "Three of a kind": (hand) => compareS2(hand, 3),
  "Two pair": (hand) => doublePairs(hand),
  "One pair": (hand) => compareS2(hand, 2),
  "High card": () => true
};

console.log(calcHands(input, { map: mapWJoker, cardPriority: cardPriorityWJoker }));
