const input = require('../../utils/getInput')(__dirname, { split: '\n\n' })

const inserts = input[1].split('\n').reduce((acc, l) => {
  const [key, value] = l.split(' -> ')
  return { ...acc, [key]: value }
}, {})

// SIMPLE NON SCALABLE VERSION

// const part1 = arr => {
//   for (let i = 0; i < 10; i = i + 1) {
//     for (let p = arr.length - 1; p >= 1; p = p - 1) {
//       arr.splice(p, 0, inserts[arr[p - 1] + arr[p]])
//     }
//   }
//   return arr
// }

// const calcResults = arr =>
//   Object.values(
//     arr.reduce((acc, l) => {
//       acc[l] = (acc[l] || 0) + 1
//       return acc
//     }, {})
//   )

// const res = part1([...input[0].split('')])
// console.log(Math.max(...calcResults(res)) - Math.min(...calcResults(res)))

const arr = input[0].split('')
const data = arr.reduce((acc, l, idx) => {
  if (idx > 0) {
    acc[arr[idx - 1] + l] = (acc[arr[idx - 1] + l] || 0) + 1
  }
  return acc
}, {})

const solve = (counter, iterations) => {
  for (let i = 0; i < iterations; i = i + 1) {
    counter = Object.entries(counter).reduce((acc, [pair, value]) => {
      const [pre, post] = pair.split('')

      acc[pre + inserts[pair]] = (acc[pre + inserts[pair]] || 0) + value
      acc[inserts[pair] + post] = (acc[inserts[pair] + post] || 0) + value
      acc[pair] = acc[pair] - value
      if (!acc[pair]) {
        delete acc[pair]
      }

      return acc
    }, counter)
  }

  return counter
}

const countLetters = obj => {
  const counter = Object.entries(obj).reduce((acc, [pair, value]) => {
    const [pre, post] = pair.split('')
    acc[pre] = (acc[pre] || 0) + value
    acc[post] = (acc[post] || 0) + value
    return acc
  }, {})

  return Object.entries(counter).reduce((acc, [l, v]) => {
    acc[l] = Math.ceil(v / 2)

    return acc
  }, {})
}

const calcResult = res =>
  Math.max(...Object.values(countLetters(res))) -
  Math.min(...Object.values(countLetters(res)))

console.log(calcResult(solve({ ...data }, 10)))
console.log(calcResult(solve({ ...data }, 40)))
