const input = require('../../utils/getInput')(__dirname, { split: ',' }).map(
  Number
)

/**
 * First non-scalable solution
 */

// let res = [...input]
// for (let g = 1; g <= 80; g++) {
//   const toAdd = res.filter(i => i === 0)

//   res = res
//     .map(i => {
//       const newI = i - 1
//       return newI < 0 ? 6 : newI
//     })
//     .concat(toAdd.map(i => 8))
// }

// console.log(res.length)

/**
 * Scalable solution
 */

const getResult = (input, days) => {
  const inputObj = input.reduce((acc, d) => {
    acc[d] = (acc[d] || 0) + 1
    return acc
  }, {})

  const daysArray = [...new Array(days)].map((_, i) => i + 1)
  const resultObj = daysArray.reduce((acc, d) => {
    const newAcc = Object.entries(acc).reduce((res, [key, val]) => {
      res[key - 1] = val
      return res
    }, {})

    if (newAcc[-1]) {
      newAcc[8] = (newAcc[8] || 0) + newAcc[-1]
      newAcc[6] = (newAcc[6] || 0) + newAcc[-1]
      delete newAcc[-1]
    }

    return newAcc
  }, inputObj)

  return Object.values(resultObj).reduce((a, b) => a + b)
}

console.log(getResult(input, 80))
console.log(getResult(input, 256))
