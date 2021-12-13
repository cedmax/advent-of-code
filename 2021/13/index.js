const input = require('../../utils/getInput')(__dirname, { split: '\n\n' })

// const input = `6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5`.split('\n\n')

const coords = input[0].split('\n').map(c => {
  const [x, y] = c.split(',')
  return { x: Number(x), y: Number(y) }
})
const folds = input[1].split('\n').map(f => {
  const [axis, value] = f.replace('fold along ', '').split('=')
  return { [axis]: Number(value) }
})

const fold = (coords, foldLine) => {
  const [axis] = Object.keys(foldLine)
  const fold = foldLine[axis]

  const remapped = coords
    .filter(c => c[axis] !== fold)
    .map(coord =>
      coord[axis] < fold
        ? coord
        : {
            ...coord,
            [axis]: coord[axis] - (coord[axis] - fold) * 2,
          }
    )

  return remapped.filter(
    ({ x, y }, index) =>
      index === remapped.findIndex(c => c.x === x && c.y === y)
  )
}

let res = fold(coords, folds.shift())
console.log(res.length)

while (folds.length) {
  const nextFold = folds.shift()
  res = fold(res, nextFold)
}

const plot = coords => {
  const { x: maxX, y: maxY } = coords.reduce(
    (acc, c) => {
      acc.x = Math.max(acc.x, c.x)
      acc.y = Math.max(acc.y, c.y)
      return acc
    },
    { x: 0, y: 0 }
  )

  const plotter = []
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      plotter[y] = plotter[y] || []
      plotter[y][x] = '.'
    }
  }
  coords.forEach(({ x, y }) => {
    plotter[y][x] = '■'
  })

  return plotter.map(i => i.join('')).join('\n')
}

console.log(plot(res))
