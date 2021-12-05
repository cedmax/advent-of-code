const input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(
  coords => coords.split(' -> ').map(point => point.split(',').map(Number))
)

const getAllValues = obj => {
  return Object.values(obj)
    .map(value => (typeof value === 'object' ? getAllValues(value) : value))
    .flat()
}

const getResult = input =>
  input.reduce((acc, [[x1, y1], [x2, y2]]) => {
    const xModifier = x1 < x2 ? +1 : -1
    const yModifier = y1 < y2 ? +1 : -1

    while (x1 !== x2 || y1 !== y2) {
      acc[x1] = acc[x1] || {}
      acc[x1][y1] = (acc[x1][y1] || 0) + 1
      if (x1 !== x2) x1 = x1 + xModifier
      if (y1 !== y2) y1 = y1 + yModifier
    }
    acc[x1] = acc[x1] || {}
    acc[x1][y1] = (acc[x1][y1] || 0) + 1

    return acc
  }, {})

const linesWithNoDiagonal = input.filter(coords => {
  const [[x1, y1], [x2, y2]] = coords
  return x1 === x2 || y1 === y2
})

console.log(
  getAllValues(getResult(linesWithNoDiagonal)).filter(i => i > 1).length
)
console.log(getAllValues(getResult(input)).filter(i => i > 1).length)
