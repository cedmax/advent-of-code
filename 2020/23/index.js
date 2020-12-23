const input = require("../../utils/getInput")(__dirname, { split: "" }).map(
  parseFloat
);

const pickupThree = (arr, pos) => {
  const pickup = arr.slice(pos, pos + 3);
  arr.splice(pos, 3);

  let addFromBeginning = 0;
  while (pickup.length < 3) {
    pickup.push(arr[addFromBeginning++]);
  }
  while (addFromBeginning) {
    arr.splice(--addFromBeginning, 1);
  }
  return pickup;
};

const findDestination = (arr, currentValue) => {
  let toFind = currentValue - 1 > 0 ? currentValue - 1 : Math.max(...arr);
  let destIdx = arr.findIndex((i) => i === toFind);
  return destIdx === -1 ? findDestination(arr, toFind) : destIdx;
};

const boundToMax = (idx, len) => (idx > len - 1 ? 0 : idx);

const findResult = (arr) => {
  let startIndex = arr.findIndex((i) => i === 1);
  let currentIndex = boundToMax(startIndex + 1, arr.length);
  let result = [];
  while (currentIndex !== startIndex) {
    result.push(arr[currentIndex]);
    currentIndex = boundToMax(currentIndex + 1, arr.length);
  }
  return result.join("");
};

const cupsRound = (arr, currentIndex, passes) => {
  currentIndex = boundToMax(currentIndex, arr.length);
  const currentValue = arr[currentIndex];
  let nextIdx = boundToMax(currentIndex + 1, arr.length);

  const pickup = pickupThree(arr, nextIdx);
  const destIdx = findDestination(arr, currentValue);

  arr.splice(destIdx + 1, 0, ...pickup);
  return passes > 0
    ? cupsRound(arr, arr.findIndex((i) => i === currentValue) + 1, --passes)
    : findResult(arr);
};

console.log(cupsRound(input, 0, 99));
