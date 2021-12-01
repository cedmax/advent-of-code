const input = require("../../utils/getInput")(__dirname, { split: '\n' }).map(Number);

const count = (input) => input.reduce((acc, item, i) => {
  const prev = input[i-1]
  return (prev && item > prev) ? ++acc : acc
}, 0)

console.log(count(input))

const blocks = input.reduce((acc, item, i) => {
  const next = input[i+1]
  const following = input[i+2]
  if (next && following) {
    acc.push(item + next + following)
  }
  return acc
}, [])

console.log(count(blocks))