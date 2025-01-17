const input = require("../../utils/getInput")(__dirname, { split: null });

const _input = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`

const print = (block) => console.log(block.map(line => line.join('')).join('\n'), '\n') 


const parse = (input) => {
    const matrix = input.split('\n\n').map(block => block.split('\n').map(line => line.split('')))
	
	const result = []
	for (block of matrix) {
     	const reversing = []
		for (let y=0; y<block.length; y++) {
			for (let x = 0; x< block[y].length; x++) {
				reversing[x] = reversing[x] || []
				reversing[x][y] = block[y][x];
			}
		}
		result.push(reversing)
	}
	return result
}

const countPins = (input) => input.map(block => block.map(line => line.filter(i => i ==="#").length-1));

const findKeys = (input) => input.filter(line => line[0][0] ==='.') 
const findLocks = (input) => input.filter(line => line[0][0] ==='#')


const parsedInput = parse(input);
const keys = countPins(findKeys(parsedInput))
const locks = countPins(findLocks(parsedInput))

const expectedLength = parsedInput[0][0].length -1


let count = 0;
for (const lock of locks) {
    
	count+=	keys.filter((key) => {
		const workingPins = key.filter((pin, pos) => {
			return pin + lock[pos]<expectedLength
        }).length
        
        return workingPins === key.length
	}).length
}

console.log(count)

