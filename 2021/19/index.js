const input = require('../../utils/getInput')(__dirname)

const parseInput = s =>
  s
    .split(/\s*---[^-]+---\s*/)
    .map(x => x.split(/\s+/).map(x => x.split(/,/).map(x => parseInt(x))))

const calcDistance = (a, b) =>
  a.reduce((acc, _, i) => acc + (a[i] - b[i]) ** 2, 0)

function fingerPrint(input) {
  const result = new Set()

  input.forEach(coords => {
    coords.forEach((beacon, beaconIdx) => {
      const bc = {
        beaconIdx,
        peers: coords
          .reduce((acc, to, toIdx) => {
            if (beaconIdx !== toIdx) {
              const distance = calcDistance(beacon, to)
              acc.push({ i: toIdx, distance })
            }

            return acc
          }, [])
          .sort((a, b) => a.distance - b.distance)
          .splice(0, 2),
      }

      const [peer1, peer2] = bc.peers
      const sumDistanceFromBeacon = peer1.distance + peer2.distance
      const distanceBetweenPeers = calcDistance(
        coords[peer1.i],
        coords[peer2.i]
      )
      const fingerprint = sumDistanceFromBeacon * distanceBetweenPeers
      result.add(fingerprint)
    })
  })
  return result
}

function main(src) {
  const [, ...coords] = parseInput(src)

  return fingerPrint(coords).size
}

console.log(main(input))
