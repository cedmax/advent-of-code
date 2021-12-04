const input = require('../../utils/getInput')(__dirname, { split: '\n\n' })

let [numbers, ...cards] = input
numbers = numbers.split(',').map(Number)
cards = cards.map(card =>
  card.split('\n').map(line => line.trim().split(/\s+/g).map(Number))
)

const validate = card => {
  return (
    card.some(line => line.every(i => i === '*')) ||
    card[0].some((item, col) => {
      if (item === '*') {
        return card.map(line => line[col]).every(i => i === '*')
      }
    })
  )
}

let winner
const toExtract = [...numbers]

while (!winner) {
  const extracted = toExtract.shift()
  cards = cards.map(card => {
    const returned = card.map(line =>
      line.map(n => (n === extracted ? '*' : n))
    )
    if (!winner) {
      winner = validate(returned) && returned
    }
    return returned
  })

  if (winner) {
    console.log(
      extracted *
        winner
          .flat(2)
          .filter(a => a !== '*')
          .reduce((a, b) => a + b)
    )
  }
}

winner = false
while (!winner) {
  const extracted = numbers.shift()
  cards = cards
    .map(card => {
      const returned = card.map(line =>
        line.map(n => (n === extracted ? '*' : n))
      )
      if (!validate(returned)) {
        return returned
      }

      if (cards.length === 1) {
        winner = returned
      }
      return
    })
    .filter(i => !!i)

  if (winner) {
    console.log(
      extracted *
        winner
          .flat(2)
          .filter(a => a !== '*')
          .reduce((a, b) => a + b)
    )
  }
}
