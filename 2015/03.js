/*--- Day 3: Perfectly Spherical Houses in a Vacuum ---

Santa is delivering presents to an infinite two-dimensional grid of houses.

He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via radio and tells him where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, he delivers another present to the house at his new location.

However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa ends up visiting some houses more than once. How many houses receive at least one present?

For example:

    > delivers presents to 2 houses: one at the starting location, and one to the east.
    ^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
    ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.
*/

var fs = require( 'fs' );
var input = fs.readFileSync( 'input/03.txt', 'utf-8' ).split( '' );

var santaCoords = [ 0,0 ];
var directionMap = {
	'^': [ 0,1 ],
	'v': [ 0,-1 ],
	'>': [ 1,0 ],
	'<': [ -1,0 ]
};

function countHouses( directions ) {
	var visitedHouses = {};
	visitedHouses[santaCoords.join()] = true;

	directions.forEach( function( direction ) {
		direction = directionMap[direction];
		santaCoords = santaCoords.map( function( item,index ) {
			return item + direction[index];
		} );
		visitedHouses[santaCoords.join()] = true;
	} );
	return Object.keys( visitedHouses ).length;
}

console.log( countHouses( input ));

/*--- Part Two ---

The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa, to deliver presents with him.

Santa and Robo-Santa start at the same location (delivering two presents to the same starting house), then take turns moving based on instructions from the elf, who is eggnoggedly reading from the same script as the previous year.

This year, how many houses receive at least one present?

For example:

    ^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
    ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
    ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.
*/

santaCoords = [ 0,0 ];
var botCoords = [ 0,0 ];

function countRoboHouses( directions ) {
	var visitedHouses = {};
	visitedHouses[santaCoords.join()] = true;
	visitedHouses[botCoords.join()] = true;

	directions.forEach( function( direction, index ) {
		direction = directionMap[direction];

		if ( index % 2 === 0 ) {
			botCoords = botCoords.map( function( item,index ) {
				return item + direction[index];
			} );
		} else {
			santaCoords = santaCoords.map( function( item,index ) {
				return item + direction[index];
			} );
		}
		visitedHouses[santaCoords.join()] = true;
		visitedHouses[botCoords.join()] = true;
	} );

	return Object.keys( visitedHouses ).length;
}

console.log( countRoboHouses( input ));
