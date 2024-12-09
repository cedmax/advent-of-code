const input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(
  line => {
    const {
      groups: { state, x, y, z },
    } =
      /((?<state>on|off) x=(?<x>-?\d+\.\.-?\d+),y=(?<y>-?\d+\.\.-?\d+),z=(?<z>-?\d+\.\.-?\d+))/.exec(
        line
      )

    return {
      s: state,
      x: parse(x),
      y: parse(y),
      z: parse(z),
    }
  }
)

function parse(coordRange) {
  const [min, max] = coordRange
    .split('..')
    .map(Number)
    .sort((a, b) => a - b)
  return { min, max }
}

const insideCube = (x, y, z, rangeX, rangeY, rangeZ) =>
  x >= rangeX.min &&
  x <= rangeX.max &&
  y >= rangeY.min &&
  y <= rangeY.max &&
  z >= rangeZ.min &&
  z <= rangeZ.max

const solve1 = input => {
  const result = new Set()
  input.forEach(({ s, x, y, z }) => {
    for (let i = -50; i <= 50; i++) {
      for (let j = -50; j <= 50; j++) {
        for (let k = -50; k <= 50; k++) {
          insideCube(i, j, k, x, y, z) &&
            result[s === 'on' ? 'add' : 'delete'](`${i},${j},${k}`)
        }
      }
    }
  })
  return result
}

console.log(solve1(input).size)

const minMaxCoords = (c1c, c2c) => ({
  min: Math.max(c1c.min, c2c.min),
  max: Math.min(c1c.max, c2c.max),
})

const getOverlaps = input => {
  const results = []

  let temp = []
  for (const cube1 of input) {
    for (const cube2 of results) {
      const x = minMaxCoords(cube1.x, cube2.x)
      if (x.min > x.max) continue

      const y = minMaxCoords(cube1.y, cube2.y)
      if (y.min > y.max) continue

      const z = minMaxCoords(cube1.z, cube2.z)
      if (z.min > z.max) continue

      temp.push({ x, y, z, s: cube2.s === 'on' ? 'off' : 'on' })
    }

    results.push(...temp.splice(0))
    if (cube1.s === 'on') results.push(cube1)
  }
  return results
}

const calc = ({ min, max }) => max + 1 - min
const volume = results =>
  results.reduce(
    (acc, { x, y, z, s }) =>
      acc + calc(x) * calc(y) * calc(z) * (s === 'on' ? 1 : -1),
    0
  )

console.log(volume(getOverlaps(input)))
