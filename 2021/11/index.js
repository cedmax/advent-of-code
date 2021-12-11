let input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(i =>
  i.split('').map(Number)
)

const loop = () => {
  for (let x = 0; x < input[0].length; x++) {
    for (let y = 0; y < input.length; y++) {
      if (typeof input[y][x] !== 'string') {
        input[y][x] = input[y][x] + 1
        if (input[y][x] > 9) {
          input[y][x] = ''
          actOnNeighbours({ x, y })
        }
      }
    }
  }
}

const actOnNeighbours = ({ x, y }) => {
  const toExplode = []
  const neighboursCoords = [
    [y, x + 1],
    [y, x - 1],
    [y - 1, x],
    [y + 1, x],
    [y - 1, x - 1],
    [y + 1, x - 1],
    [y - 1, x + 1],
    [y + 1, x + 1],
  ]
  neighboursCoords.forEach(([yn, xn]) => {
    if (
      input[yn] &&
      typeof input[yn][xn] !== 'string' &&
      typeof input[yn][xn] !== 'undefined'
    ) {
      input[yn][xn] = input[yn][xn] + 1
      if (input[yn][xn] > 9) {
        input[yn][xn] = ''
        toExplode.push([yn, xn])
      }
    }
  })
  toExplode.forEach(([y, x]) => actOnNeighbours({ y, x }))
}

let totalFlashes = 0
for (let counter = 0; counter < 100; counter++) {
  loop()
  const flashes = JSON.stringify(input).match(/""/g)
  if (flashes) {
    totalFlashes += flashes.length
  }
  input = JSON.parse(JSON.stringify(input).replace(/""/g, 0))
}

console.log(totalFlashes)

input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(i =>
  i.split('').map(Number)
)

let allFlashed = false
let counter = 0
while (!allFlashed) {
  loop()
  const flashes = JSON.stringify(input).match(/""/g)
  if (flashes && flashes.length === 100) {
    allFlashed = true
  }
  input = JSON.parse(JSON.stringify(input).replace(/""/g, 0))
  counter++
}

console.log(counter)
