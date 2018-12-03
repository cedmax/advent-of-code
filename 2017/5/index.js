let input = require('./input').split('\n').map(i => parseInt(i, 10))

let i = 0;
let steps = 0
while (i<input.length) {
  const current = input[i]
  input[i] = input[i] + 1
  i = i + current

  steps++
}

console.log(steps)

input = require('./input').split('\n').map(i => parseInt(i, 10))

i = 0;
steps = 0
while (i<input.length) {
  const current = input[i]
  input[i] = (input[i]>=3) ? input[i]-1 : input[i]+1
  i = i + current

  steps++
}

console.log(steps)
