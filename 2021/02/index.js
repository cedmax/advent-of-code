const input = require('../../utils/getInput')(__dirname, { split: '\n' })

const valueMap = {
  forward: 1,
  up: -1,
  down: 1,
}

const propMap = {
  forward: 'x',
  up: 'y',
  down: 'y',
}

const { x, y } = input.reduce(
  (coord, inputItem) => {
    const [dir, value] = inputItem.split(' ')
    const prop = propMap[dir]
    const modifier = valueMap[dir] * parseFloat(value)
    coord[prop] = coord[prop] + modifier

    return coord
  },
  { x: 0, y: 0 }
)

console.log(x * y)

const newPropMap = {
  forward: 'pos',
  up: 'aim',
  down: 'aim',
}

const { pos, depth } = input.reduce(
  (coord, inputItem) => {
    const [dir, value] = inputItem.split(' ')
    const prop = newPropMap[dir]
    const modifier = valueMap[dir] * parseFloat(value)
    coord[prop] = coord[prop] + modifier

    if (dir === 'forward') {
      coord.depth = coord.depth + coord.aim * parseFloat(value)
    }
    return coord
  },
  { pos: 0, depth: 0, aim: 0 }
)

console.log(pos * depth)
