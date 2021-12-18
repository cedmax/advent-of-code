const input = require('../../utils/getInput')(__dirname, { split: null })

//const input = 'target area: x=20..30, y=-10..-5'

const rMarks = input.match(/(-?[0-9]+)/g).map(Number)
const ranges = {
  x: [rMarks[0], rMarks[1]],
  y: [rMarks[3], rMarks[2]],
}

const hitTheMark = (x, y) => {
  const {
    x: [minX, maxX],
    y: [minY, maxY],
  } = ranges
  return x >= minX && x <= maxX && y <= minY && y >= maxY
}

const tooFar = (x, y) => {
  const {
    x: [, maxX],
    y: [, maxY],
  } = ranges
  return x > maxX || y < maxY
}

const calculateLaunch = (speedX, speedY) => {
  let x = 0
  let y = 0
  let maxY = 0
  while (!hitTheMark(x, y) && !tooFar(x, y)) {
    x = x + speedX
    y = y + speedY
    maxY = Math.max(maxY, y)
    speedX = speedX === 0 ? 0 : speedX > 0 ? speedX - 1 : speedX + 1
    speedY = speedY - 1
  }
  if (hitTheMark(x, y)) return maxY
}

const findSpeed = () => {
  const [minX] = ranges.x
  const [, maxY] = ranges.y
  const results = []
  for (let x = 0; x <= minX * 5; x++) {
    for (let y = maxY * 5; y <= -maxY * 5; y++) {
      const result = calculateLaunch(x, y)
      if (typeof result !== 'undefined') {
        results.push({ max: result, vel: `${x},${y}` })
      }
    }
  }
  return {
    max: Math.max(...results.map(({ max }) => max)),
    unique: [...results.map(x => x)].length,
  }
}

//console.log(findSpeed())
console.log(findSpeed())
