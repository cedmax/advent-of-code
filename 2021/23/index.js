/**
 * this is the code I used to calculate the result of my manual solution
 */

const solution1 = require('./part1').text.match(/(\d+[A-Z])/g)
const solution2 = require('./part2').text.match(/(\d+[A-Z])/g)

const replace = s =>
  s
    .replace('A', '*1')
    .replace('B', '*10')
    .replace('C', '*100')
    .replace('D', '*1000')

const calculate = solution =>
  solution.reduce((acc, entry) => {
    return acc + eval(replace(entry))
  }, 0)

console.log(calculate(solution1))
console.log(calculate(solution2))

/**
 * Later I decided to visualise it as I felt bad about
 * having done the whole thing without coding
 */

const { LiveContainer } = require('clui-live')
const input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(
  i => i.split('')
)

const clone = input => [...input.map(i => [...i])]
const print = input => input.map(i => `    ` + i.join('')).join('\n')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const getCharValue = chr => ({ A: 1, B: 10, C: 100, D: 1000 })[chr]

const move = ([x0, y0], [destX, destY]) => {
  y1 = y0
  if (x0 !== destX && y0 !== 1) {
    x1 = x0
    y1 = y0 - 1
  }
  if (x0 !== destX && y0 === 1) {
    x1 = x0 + (destX > x0 ? +1 : -1)
  }
  if (x0 === destX) {
    y1 = y0 + 1
  }

  return [x1, y1]
}

const visualise = async (input, commands) => {
  const container = new LiveContainer().hook()
  const breaker = container.createLiveArea().hook()
  breaker.write('\n')
  const schema = container.createLiveArea().hook()
  const points = container.createLiveArea().hook()

  let total = 0
  schema.write(print(input))
  for (let i = 0; i < commands.length; i++) {
    const {
      from: [x, y],
      to,
    } = commands[i]

    const character = input[y][x]

    let x0 = x
    let y0 = y

    const [destX, destY] = to
    while (x0 !== destX || y0 !== destY) {
      const [x1, y1] = move([x0, y0], [destX, destY])

      input[y0][x0] = '.'
      input[y1][x1] = character

      x0 = x1
      y0 = y1

      total = total + getCharValue(character)
      await sleep(75)

      schema.write(print(input))
      points.write(`\n    ${total}\n`)
    }
  }
}

;(async () => {
  await visualise(clone(input), require('./part1').movements)
  input.splice(3, 0, `  #D#C#B#A#`.split(''), `  #D#B#A#C#`.split(''))
  await visualise(clone(input), require('./part2').movements)
})()
