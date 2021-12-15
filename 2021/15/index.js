const input = require('../../utils/getInput')(__dirname, { split: '\n' }).map(
  line => line.split('').map(Number)
)

// I didn't solve this, but I took it as a learning opportunity.
// I got a solution from reddit and broke it apart and put it
// together until it made sense to my brain

const coordsToStr = (x, y) => `${x},${y}`
const coordsToArr = str => str.split(',').map(Number)

const finalDestination = coordsToStr(input[0].length - 1, input.length - 1)
const maxPossibleDistance = input.reduce((acc, l) => {
  const lineTotal = l.reduce((acc, cur) => acc + cur, 0)
  return acc + lineTotal
}, 0)

const [allNodes, coordsList] = ((allNodes = {}, coordsList = new Set()) => {
  input.forEach((line, y) => {
    line.forEach((cost, x) => {
      allNodes[coordsToStr(x, y)] = {
        cost,
        distance: maxPossibleDistance,
      }
      coordsList.add(coordsToStr(x, y))
    })
  })

  allNodes[coordsToStr(0, 0)].distance = 0
  return [allNodes, coordsList]
})()

const updateNodeDistance = (nodes, coord, curDistance, visited, cache) => {
  const { distance, cost } = nodes[coord] || {}

  if (distance && !visited.has(coord)) {
    nodes[coord].distance = Math.min(distance, curDistance + cost)
    if (nodes[coord].distance < maxPossibleDistance) {
      cache.add(coord)
    }
  }

  return [nodes, cache]
}

const getCloser = (nodes, queue) => {
  let distance = Infinity
  let nextCoords = ''

  Array.from(queue).forEach(coords => {
    if (nodes[coords].distance < distance) {
      distance = nodes[coords].distance
      nextCoords = coords
    }
  })

  return coordsToArr(nextCoords)
}

const navigate = (nodes, queue, finalDestination, cache = new Set()) => {
  const visited = new Set()
  let currentNode = [0, 0]

  while (queue.has(finalDestination)) {
    const [x, y] = currentNode
    const coordStr = coordsToStr(x, y)
    const { distance } = nodes[coordStr]

    ;[
      coordsToStr(x, y - 1), // up
      coordsToStr(x + 1, y), // right
      coordsToStr(x, y + 1), // down
      coordsToStr(x - 1, y), //  left
    ].forEach(coords => {
      ;[nodes, cache] = updateNodeDistance(
        nodes,
        coords,
        distance,
        visited,
        cache
      )
    })

    visited.add(coordStr)
    queue.delete(coordStr)
    cache.delete(coordStr)

    currentNode = getCloser(nodes, cache)
  }
  return nodes[finalDestination].distance
}

console.log(navigate(allNodes, coordsList, finalDestination))

const finalDestinationPart2 = coordsToStr(
  input[0].length * 5 - 1,
  input.length * 5 - 1
)

const [allNodesPart2, coordsListPart2] = ((
  allNodes = {},
  coordsList = new Set()
) => {
  for (let i = 0; i < 5; i++) {
    input.forEach((line, y) => {
      const realY = i * input.length + y

      for (let j = 0; j < 5; j++) {
        line.forEach((cost, x) => {
          const realX = j * input[y].length + x
          let realCost = cost + i + j
          if (realCost > 9) {
            realCost = realCost % 9
          }

          allNodes[coordsToStr(realX, realY)] = {
            cost: realCost,
            distance: maxPossibleDistance,
          }
          coordsList.add(coordsToStr(realX, realY))
        })
      }
    })
  }

  allNodes[coordsToStr(0, 0)].distance = 0
  return [allNodes, coordsList]
})()

console.log(navigate(allNodesPart2, coordsListPart2, finalDestinationPart2))
