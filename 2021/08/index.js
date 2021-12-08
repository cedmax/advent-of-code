const input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(
  i =>
    i.split(' | ').map(i => i.split(' ').map(i => i.split('').sort().join('')))
)

const result = input
  .map(i => i[1])
  .flat()
  .filter(i => [2, 3, 4, 7].includes(i.length)).length

console.log(result)

/**
 * second leg
 */

const diff = (a, b) => a.filter(x => !b.includes(x))
const get = (arr, rule) => arr.splice(arr.findIndex(rule), 1)[0]

// verbose and understandable version
const map = input => {
  input = input.map(i => i.split(''))

  // identifiable by length
  const one = get(input, i => i.length === 2)
  const eight = get(input, i => i.length === 7)
  const four = get(input, i => i.length === 4)
  const seven = get(input, i => i.length === 3)

  // identifiable by diff
  const nine = get(input, i => i.length === 6 && !diff(four, i).length)
  const six = get(input, i => i.length === 6 && diff(one, i).length)
  const three = get(input, i => i.length === 5 && !diff(one, i).length)
  const two = get(input, i => diff(four, i).length > 1)

  // leftovers
  const zero = get(input, i => i.length === 6)
  const five = get(input, i => i.length === 5)

  return [zero, one, two, three, four, five, six, seven, eight, nine].map(i =>
    i.join('')
  )
}

// // terse and wtf is going on version because why not
// const rules = [
//   r => i => i.length === 6,
//   r => i => i.length === 2,
//   r => i => diff(r[4], i).length > 1,
//   r => i => i.length === 5 && !diff(r[1], i).length,
//   r => i => i.length === 4,
//   r => i => i.length === 5,
//   r => i => i.length === 6 && diff(r[1], i).length,
//   r => i => i.length === 3,
//   r => i => i.length === 7,
//   r => i => i.length === 6 && !diff(r[4], i).length,
// ]

// const map = input => {
//   input = input.map(i => i.split(''))
//   const order = [1, 8, 4, 7, 9, 6, 3, 2, 0, 5]

//   const result = order.reduce((acc, i) => {
//     acc[i] = get(input, rules[i](acc))
//     return acc
//   }, [])

//   return result.map(i => i.join(''))
// }

const decode = ([rules, toDecode]) => {
  const mappedRules = map(rules)
  const result = toDecode.map(i => mappedRules.findIndex(r => r === i))

  return Number(result.join(''))
}

console.log(input.reduce((acc, i, c) => acc + decode(i), 0))
