const input = require('../../utils/getInput')(__dirname, { split: null })

const parseInput = str =>
  str
    .split('')
    .map(i => parseInt(i, 16).toString(2).padStart(4, '0'))
    .join('')
    .split('')
    .map(Number)

const calcLeafValue = (arr, parts) => {
  let result = []
  let forceExit
  while (arr.length && !forceExit) {
    const [isNotOver, ...part] = arr.splice(0, 5)
    result.push(part.join('').padStart(4, '0'))
    if (!isNotOver) {
      forceExit = true
    }
  }
  parts.push(parseInt(result.join(''), 2))
  return parts
}

const operations = {
  0: arr => arr.reduce((acc, a) => acc + a, 0),
  1: arr => arr.reduce((acc, a) => acc * a, 1),
  2: arr => Math.min(...arr),
  3: arr => Math.max(...arr),
  5: arr => (arr[0] > arr[1] ? 1 : 0),
  6: arr => (arr[0] < arr[1] ? 1 : 0),
  7: arr => (arr[0] === arr[1] ? 1 : 0),
}

const process = input => {
  const processByLength = arr => {
    let subStack = []
    const length = parseInt(arr.splice(0, 15).join(''), 2)
    const block = arr.splice(0, length)
    while (block.length) {
      subStack = analyze(block, subStack)
    }

    return subStack
  }

  const processByBlocks = arr => {
    let subStack = []
    let numberOfPackets = parseInt(arr.splice(0, 11).join('').padStart(4), 2)
    while (numberOfPackets) {
      subStack = analyze(arr, subStack)
      numberOfPackets--
    }
    return subStack
  }

  let versionSum = 0
  let total = 0
  const analyze = (arr, parts = []) => {
    const version = arr.splice(0, 3).join('').padStart(4, '0')
    versionSum += parseInt(version, 2)

    const typeId = arr.splice(0, 3).join('').padStart(4, '0')
    if (parseInt(typeId, 2) === 4) {
      return calcLeafValue(arr, parts)
    } else {
      const lengthOfTypeID = arr.splice(0, 1)[0]
      const subStack = !lengthOfTypeID
        ? processByLength(arr)
        : processByBlocks(arr)

      const operationResult = operations[`${parseInt(typeId, 2)}`](subStack)
      total = operationResult

      parts.push(operationResult)
      return parts
    }
  }

  analyze(parseInput(input))
  return { versionSum, total }
}

console.log(process(input))
