const input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(
  i => i.split('').map(Number)
)

const checkNeighbours = (map, { x, y }) => {
  const number = map[y][x]
  const neighbours = [
    input[y][x - 1],
    input[y][x + 1],
    input[y - 1] && input[y - 1][x],
    input[y + 1] && input[y + 1][x],
  ].filter(i => typeof i !== 'undefined')

  if (Math.min(...neighbours) > number) {
    return number
  }
}

let lowPoints = []
for (let x = 0; x < input[0].length; x++) {
  for (let y = 0; y < input.length; y++) {
    const result = checkNeighbours(input, { x, y })

    if (!isNaN(result)) {
      lowPoints.push({ x, y })
    }
  }
}

console.log(
  lowPoints.map(({ x, y }) => input[y][x] + 1).reduce((a, b) => a + b, 0)
)

const getBasinSize = ({ x, y }) => {
  const basin = [`${y},${x}`]
  let size = 0
  while (size < basin.length) {
    size = basin.length
    for (const basinCoords of basin) {
      const [y, x] = basinCoords.split(',').map(Number)
      const neighbours = {
        [`${y - 1},${x}`]: input[y - 1] && input[y - 1][x],
        [`${y + 1},${x}`]: input[y + 1] && input[y + 1][x],
        [`${y},${x - 1}`]: input[y] && input[y][x - 1],
        [`${y},${x + 1}`]: input[y] && input[y][x + 1],
      }

      Object.entries(neighbours).forEach(([coords, val]) => {
        const [y, x] = coords.split(',').map(Number)
        if (val < 9 && !basin.includes(y + ',' + x)) {
          basin.push(y + ',' + x)
        }
      })
    }
  }

  return size
}

const basinSizes = lowPoints.map(getBasinSize).sort((a, b) => b - a)
console.log(basinSizes[0] * basinSizes[1] * basinSizes[2])
