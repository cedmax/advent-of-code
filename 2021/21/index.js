const input = require('../../utils/getInput')(__dirname)
  .match(/\d+/g)
  .map(Number)

const [, player1Start, , player2Start] = input

const game = {
  player1: {
    position: player1Start,
    score: 0,
  },
  player2: {
    position: player2Start,
    score: 0,
  },
}

function* diceRoll(min, max) {
  let value = min - 1
  while (true) {
    value = ++value > max ? min : value
    yield value
  }
}

let counter = 0
const playerMove = (player, dice) => {
  const { position, score } = player
  const diceResults = [
    dice.next().value,
    dice.next().value,
    dice.next().value,
  ].reduce((a, b) => a + b, 0)
  counter = counter + 3
  const newPosition = (position + diceResults) % 10 || 10

  return {
    position: newPosition,
    score: score + newPosition,
  }
}

const dice = diceRoll(1, 100)
while (true) {
  const { player1, player2 } = game
  game.player1 = playerMove(player1, dice)
  if (game.player1.score >= 1000) break
  game.player2 = playerMove(player2, dice)
  if (game.player2.score >= 1000) break
}

console.log(counter * Math.min(game.player1.score, game.player2.score))

const qDiceResults = [1, 2, 3].flatMap(first => {
  return [1, 2, 3].flatMap(second => {
    return [1, 2, 3].map(third => [first, second, third])
  })
})
const qDiceRollMap = qDiceResults.reduce((acc, next) => {
  const valueKey = next.reduce((a, b) => a + b, 0)
  acc[valueKey] = (acc[valueKey] || 0) + 1
  return acc
}, {})

const min = Math.min(...Object.keys(qDiceRollMap).map(Number))
const max = Math.max(...Object.keys(qDiceRollMap).map(Number))

const playQuantumGame = ({
  positions: prevPositions,
  scores: prevScores,
  universes: prevUniverses,
  turn,
  wins,
}) => {
  for (let rollValue = min; rollValue <= max; rollValue++) {
    const positions = [...prevPositions]
    const scores = [...prevScores]
    const universes = prevUniverses * qDiceRollMap[rollValue]

    positions[turn] = (positions[turn] + rollValue) % 10 || 10
    scores[turn] += positions[turn]

    if (scores[turn] >= 21) {
      wins[turn] += universes
    } else {
      wins = playQuantumGame({
        turn: turn === 1 ? 0 : 1,
        positions,
        scores,
        universes,
        wins,
      })
    }
  }
  return wins
}

const qGame = {
  positions: [player1Start, player2Start],
  scores: [0, 0],
  wins: [0, 0],
  turn: 0,
  universes: 1,
}

const [player1Score, player2Score] = playQuantumGame(qGame)

console.log(Math.max(player1Score, player2Score))
