const input = require('../../utils/getInput')(__dirname, { split: '\n\n' })

const [enhancementString, image] = input
const enhancement = enhancementString.split('')
const pixels = image.split('\n').map(i => i.split(''))

let offCanvasPixels = '.'
const turnOffCanvasPixels = () => {
  const offCanvasIdx = binaryToIdx(charToPx(offCanvasPixels).repeat(9), 2)
  offCanvasPixels = enhancement[offCanvasIdx]
}

const createCanvas = (pixels, filler) => {
  const emptyLine = [...new Array(pixels[0].length)].map(() => filler)
  const canvas = [emptyLine, ...pixels, emptyLine].map(line => [
    filler,
    ...line,
    filler,
  ])
  return canvas
}

const binaryToIdx = str => parseInt(str, 2)
const charToPx = char => {
  switch (char) {
    case '#':
      return '1'
    case '.':
      return '0'
  }
}

const enhance = pixels => {
  const filler = offCanvasPixels
  const canvas = createCanvas(pixels, filler)
  const newCanvas = createCanvas(pixels, filler)

  for (let x = 0; x < canvas[0].length; x++) {
    for (let y = 0; y < canvas.length; y++) {
      const neigbours = [
        canvas[y - 1] && canvas[y - 1][x - 1],
        canvas[y - 1] && canvas[y - 1][x],
        canvas[y - 1] && canvas[y - 1][x + 1],
        canvas[y] && canvas[y][x - 1],
        canvas[y] && canvas[y][x],
        canvas[y] && canvas[y][x + 1],
        canvas[y + 1] && canvas[y + 1][x - 1],
        canvas[y + 1] && canvas[y + 1][x],
        canvas[y + 1] && canvas[y + 1][x + 1],
      ].map((char = filler) => charToPx(char))

      const binary = binaryToIdx(neigbours.join(''))
      newCanvas[y][x] = enhancement[binary]
    }
  }
  turnOffCanvasPixels()
  return newCanvas
}

let result = pixels
for (i = 0; i < 2; i++) {
  result = enhance(result)
}
console.log(result.flat().filter(i => i === '#').length)

for (i = 2; i < 50; i++) {
  result = enhance(result)
}

console.log(result.flat().filter(i => i === '#').length)
