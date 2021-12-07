let input = require('../../utils/getInput')(__dirname, { split: ',' }).map(
  Number
)

const sorted = [...input].sort((a, b) => a - b)
const median = sorted[sorted.length / 2]
console.log(input.reduce((a, b) => a + Math.abs(median - b), 0))

const average = Math.floor(input.reduce((a, b) => a + b, 0) / input.length)
console.log(
  input.reduce((acc, pos) => {
    const distance = Math.abs(pos - average)
    const fuelUsed = [...new Array(distance)]
      .map((_, i) => i + 1)
      .reduce((a, b) => a + b, 0)
    return acc + fuelUsed
  }, 0)
)
