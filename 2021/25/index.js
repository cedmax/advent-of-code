let input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(l =>
  l.split('')
)

const getMovesRight = input => {
  const moves = []
  input.forEach((line, i) => {
    line.forEach((chr, j) => {
      const nextIdx = line[j + 1] ? j + 1 : 0
      if (chr === '>' && line[nextIdx] === '.') {
        moves.push([
          { x: j, y: i },
          { x: nextIdx, y: i },
        ])
      }
    })
  })
  return moves
}

const getMovesDown = input => {
  const moves = []
  input.forEach((line, i) => {
    line.forEach((chr, j) => {
      const nextIdx = input[i + 1] ? i + 1 : 0
      if (chr === 'v' && input[nextIdx][j] === '.') {
        moves.push([
          { x: j, y: i },
          { x: j, y: nextIdx },
        ])
      }
    })
  })
  return moves
}

const move = (input, moves, chr) => {
  moves.forEach(([pre, post]) => {
    input[pre.y][pre.x] = '.'
    input[post.y][post.x] = chr
  })
  return input
}

let loops = 0
while (true) {
  const movesRight = getMovesRight(input)
  input = move(input, movesRight, '>')
  const movesDown = getMovesDown(input)
  input = move(input, movesDown, 'v')
  loops++
  if (!movesRight.length && !movesDown.length) {
    break
  }
}

console.log(loops)
