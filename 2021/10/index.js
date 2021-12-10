const input = require('../../utils/getInput')(__dirname, { split: '\n' })

const results = input
  .map(line => {
    while (line.match(/(\[\]|<>|\(\))|{}/)) {
      line = line.replace(/(\[\]|<>|\(\))|{}/g, '')
    }
    const wrongclosing = line.match(/[\[<\({]([\]\)>}])/)
    return wrongclosing && wrongclosing[1]
  })
  .filter(i => i)

const valueMapping = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

console.log(results.map(i => valueMapping[i]).reduce((a, b) => a + b, 0))

const newValMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const secondPart = input
  .map(line => {
    while (line.match(/(\[\]|<>|\(\))|{}/)) {
      line = line.replace(/(\[\]|<>|\(\))|{}/g, '')
    }
    const wrongclosing = line.match(/[\[<\({]([\]\)>}])/)
    return (
      !wrongclosing &&
      line
        .split('')
        .reverse()
        .join('')
        .replace(/{/g, '}')
        .replace(/</g, '>')
        .replace(/\(/g, ')')
        .replace(/\[/g, ']')
    )
  })
  .filter(i => i)
  .map(line => {
    return line.split('').reduce((acc, val) => {
      acc = acc * 5 + newValMap[val]
      return acc
    }, 0)
  })
  .sort((a, b) => a - b)

console.log(secondPart[Math.floor(secondPart.length / 2)])
