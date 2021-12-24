const input = require('../../utils/getInput')(__dirname, { split: null })

const commands = input
  .split(`inp w\n`)
  .map(l => (`inp w\n` + l).trim().split('\n'))
  .filter(({ length }) => length > 1)
  .map(l => {
    const type = Number(l[4].match(/-?\d+/)[0]) === 1 ? 'add' : 'remove'
    const varA = Number(l[5].match(/-?\d+/)[0])
    const varB = Number(l[15].match(/-?\d+/)[0])
    return {
      type,
      varA,
      varB,
    }
  })

/**
 * At first I've solved it manually following the
 * rules below, as explained in the screenshot attached
 * then I wrote the code.
 *
 * Screenshot URL: https://raw.githubusercontent.com/cedmax/advent-of-code/main/2021/24/explanation.png
 */

// E + 0 = F => 99 / 11
// G - 4 = H => 95 / 51
// D - 1 = I => 98 / 21
// J + 7 = K => 29 / 18
// C - 6 = L => 93 / 71
// B + 6 = M => 39 / 17
// A + 4 = N => 59 / 15

// 53999995829399
// 11721151118175

const tmp = []
const rules = []
commands.forEach(({ type, varA, varB }, i) => {
  if (type === 'add') {
    tmp.push([i, varB])
  } else {
    const lastInserted = tmp.pop()
    rules.push([lastInserted[0], lastInserted[1] + varA, i])
  }
})

const firstPart = rules
  .reduce((acc, [idx, modifier, idx2]) => {
    for (let first = 1; first <= 9; first++) {
      for (let second = 1; second <= 9; second++) {
        if (first + modifier === second) {
          acc[idx] = first
          acc[idx2] = second
        }
      }
    }
    return acc
  }, [])
  .join('')

const secondPart = rules
  .reduce((acc, [idx, modifier, idx2]) => {
    for (let first = 9; first >= 1; first--) {
      for (let second = 9; second >= 1; second--) {
        if (first + modifier === second) {
          acc[idx] = first
          acc[idx2] = second
        }
      }
    }
    return acc
  }, [])
  .join('')

console.log(firstPart, secondPart)
