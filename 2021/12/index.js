const input = require('../../utils/getInput')(__dirname, { split: '\n' })

const pathsMapped = input.reduce((acc, path) => {
  const [start, end] = path.split('-')
  acc[start] = (acc[start] || []).concat([end])
  acc[end] = (acc[end] || []).concat([start])
  return acc
}, {})

const findExitPath =
  rule =>
  (position = 'start', cache = [], results = []) => {
    if (position === 'start' && cache.includes('start')) return
    cache = [...cache, position]

    if (position !== 'end') {
      for (const possibleNext of pathsMapped[position]) {
        if (rule(possibleNext, cache)) {
          findExitPath(rule)(possibleNext, cache, results)
        }
      }
    } else {
      results.push(cache)
    }

    return results
  }

const rulePart1 = (possibleNext, cache) =>
  possibleNext.toLowerCase() !== possibleNext || !cache.includes(possibleNext)

const rulePart2 = (possibleNext, cache) => {
  if (possibleNext.toLowerCase() === possibleNext) {
    var cantVisitAgain = cache.filter(
      a => a.toLowerCase() === a && cache.filter(c => a === c).length > 1
    ).length
  }
  return rulePart1(possibleNext, cache) || !cantVisitAgain
}

console.log(findExitPath(rulePart1)().length)
console.log(findExitPath(rulePart2)().length)
