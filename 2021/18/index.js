const input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(
  s =>
    s
      .replace(/,/g, '')
      .split('')
      .map(s => (isNaN(s) ? s : Number(s)))
)

const applyExplosion = (arr, i) => {
  const [, leftNum, rightNum] = arr.splice(i, 4)

  let leftCursor = i
  while (leftCursor--) {
    if (!isNaN(arr[leftCursor])) {
      arr[leftCursor] += leftNum
      break
    }
  }

  let rightCursor = i - 1
  while (rightCursor++ < arr.length) {
    if (!isNaN(arr[rightCursor])) {
      arr[rightCursor] += rightNum
      break
    }
  }

  arr.splice(i, 0, 0)
  return arr
}

function explode(arr) {
  let open = 0
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    if (current == '[') open++
    if (current == ']') open--

    if (open == 5) {
      arr = applyExplosion(arr, i)
      explode(arr)
      return true
    }
  }
  return false
}

function split(arr) {
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    if (!isNaN(current) && current > 9) {
      let left = Math.floor(current / 2)
      let right = Math.ceil(current / 2)
      arr.splice(i, 1, '[', left, right, ']')
      return true
    }
  }
  return false
}

const sum = (a, b) => {
  const result = ['[', ...a, ...b, ']']
  while (explode(result) || split(result));
  return result
}

const magnitude = arr => {
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i]
    if (current == ']') {
      const [, left, right] = arr.splice(i - 3, 4)
      const calculation = left * 3 + right * 2
      arr.splice(i - 3, 0, calculation)
      i -= 3
    }
  }
  return arr[0]
}

const [init, ...rest] = input
const result = rest.reduce(sum, init)

console.log(magnitude(result))

const combinations = input
  .map((_, i) => {
    return input
      .filter((_, j) => i != j)
      .map((_, j) => [
        [i, j],
        [j, i],
      ])
  })
  .flat(2)

const max = combinations.reduce((max, [index1, index2]) => {
  const result = magnitude(sum(input[index1], input[index2]))
  return Math.max(max, result)
}, 0)

console.log(max)
