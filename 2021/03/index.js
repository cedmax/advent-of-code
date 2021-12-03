const input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(
  i => i.split('').map(i => Number(i))
)

const flipbits = str =>
  str
    .split('')
    .map(b => (1 - b).toString())
    .join('')

const gammaBits = input[0]
  .map((item, i) => {
    const ones = input.filter(line => !!line[i])
    return ones.length > input.length / 2 ? 1 : 0
  })
  .join('')

console.log(gammaBits)
const gamma = parseInt(gammaBits, 2)
const epsilon = parseInt(flipbits(gammaBits), 2)

console.log(gamma * epsilon)

const findWithCondition = (input, cond) => {
  let forceResult
  let clonedInput = [...input]
  const result = input[0]
    .map((a, i) => {
      const ones = clonedInput.filter(line => !!line[i])
      const value = cond(ones.length, clonedInput.length / 2) ? 1 : 0

      if (clonedInput.length === 1) {
        forceResult = clonedInput[0].join('')
      }

      clonedInput = clonedInput
        .map(item => {
          return value === item[i] ? item : null
        })
        .filter(i => i != null)

      return value
    })
    .join('')

  return forceResult || result
}

const oxyGen = parseInt(
  findWithCondition(input, (a, b) => a >= b),
  2
)
const co2scrub = parseInt(
  findWithCondition(input, (a, b) => a < b),
  2
)

console.log(oxyGen * co2scrub)
