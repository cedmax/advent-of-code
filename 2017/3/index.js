let input = 277678
//                                            *134*
// 101 100  99  98  97  96  95  94  93  92 *91*133
// 102  65  64  63  62  61  60  59  58 *57* 90 132
// 103  66  37  36  35  34  33  32 *31* 56  89 131
// 105  67  38  17  16  15  14 *13* 30  55  88 130
// 106  68  39  18   5   4  *3* 12  29  54  87 129
// 107  69  40  19   6  *1*  2  11  28  53  86 128
// 108  70  41  20   7   8   9  10  27  52  85 127
// 109  71  42  21  22  23  24  25  26  51  84 126
// 110  72  43  44  45  46  47  48  49  50  83 125
// 111  73  74  75  76  77  78  79  80  81  82 124
// 112 113 114 115 116 117 118 119 120 121 122 123

// 1        3       13       31       57        91       134
//     +2      +10      +18      +26       +34      +42      
//         +8       +8       +8       +8        +8           <= addendum

const calcToAxis = (addendumInit) => {
  const initialCorner = 1
  let cornerValue = initialCorner;
  let cirled = 0
  let addendum = addendumInit;
  do {
    cornerValue = cornerValue + addendum
    addendum = addendum + 8
    cirled++
  } while (cornerValue < input)

  
  let closestHorizontalValue = cornerValue - cirled
  if (closestHorizontalValue > input) {
    return calcToAxis(addendumInit + 2) //move to next diagolan axis
  } else {
    return { closestValue: closestHorizontalValue, circles: cirled }
  }
}

const { closestValue, circles } = calcToAxis(2)
const distance = input - closestValue + circles
console.log(distance)



const steps = ([y, x]) => ({
  right: [y, x+1],
  left: [y, x-1],
  top: [y-1, x],
  bottom: [y+1, x],
  topright: [y-1, x+1],
  topleft: [y-1, x-1],
  bottomleft: [y+1, x-1],
  bottomright: [y+1, x+1],
})
const order = ['right', 'top', 'left', 'bottom'];
const orderDiag = ['topright', 'topleft', 'bottomleft', 'bottomright'];

const getDiagonalValues = (movement) => {
  const content = orderDiag.map((direction) => {
    const next = movement[direction]
    return matrixArray[next[0]][next[1]]
  })
  const sum = content.reduce((acc, i) => acc + i );
  return sum
}


const calc = (matrixArray, coords) => {
  const movement = steps(coords);

  const content = order.map((direction) => {
    const next = movement[direction]

    return matrixArray[next[0]][next[1]]
  })
  const sum = content.reduce((acc, i) => acc + i );

  let direction;
  switch (sum) {
    case content[1]: 
      direction = 'right';
      break;
    case content[2]:
      direction = 'top';
      break
    case content[3]:
      direction = 'left';
      break;
    case content[0]:
      direction = 'bottom';
      break;
    case content[0] + content[3]: 
      direction = 'left'
      break;
    case content[0] + content[1]: 
      direction = 'bottom'
      break;
    case content[1] + content[2]: 
      direction = 'right'
      break;
    case content[2] + content[3]: 
      direction = 'top'
      break;
  }

  const diag = getDiagonalValues(movement)
  // console.log({mov: movement[direction], sum:sum || 1, diag})
  return {
    mov: movement[direction], 
    sum: (sum || 1) + diag
  }
}

let next = 1
const matrixArray = [...(new Array(11))].map(() => [...(new Array(11))].map(()=>0))
center = 10/2;
let coords = [center, center];
matrixArray[center][center] = next;

while (next < input) {
  const {
    mov,
    sum
  } = calc(matrixArray, coords)

  const [y, x] = coords;
  matrixArray[y][x] = sum;

  coords = mov
  next =  sum
}

console.log(matrixArray)
console.log(next)

