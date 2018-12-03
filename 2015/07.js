/*--- Day 7: Some Assembly Required ---

This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates! Unfortunately, little Bobby is a little under the recommended age range, and he needs help assembling the circuit.

Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal (a number from 0 to 65535). A signal is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source, but can provide its signal to multiple destinations. A gate provides no signal until all of its inputs have a signal.

The included instructions booklet describe how to connect the parts together: x AND y -> z means to connect wires x and y to an AND gate, and then connect its output to wire z.

For example:

    123 -> x means that the signal 123 is provided to wire x.
    x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
    p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
    NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.

Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, you'd like to emulate the circuit instead, almost all programming languages (for example, C, JavaScript, or Python) provide operators for these gates.

For example, here is a simple circuit:

123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i

After it is run, these are the signals on the wires:

d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456

In little Bobby's kit's instructions booklet (provided as your puzzle input), what signal is ultimately provided to wire a?*/


var fs = require( 'fs' );
var input = fs.readFileSync( 'input/07bis.txt', 'utf-8' ).split( '\n' );

function modulo( a, b ) {
	return a - Math.floor( a / b ) * b;
}

function ToInteger( x ) {
	x = Number( x );
	return x < 0 ? Math.ceil( x ) : Math.floor( x );
}

function ToUint16( x ) {
	return modulo( ToInteger( x ), Math.pow( 2, 16 ));
}

function execute( first, operation, second ) {
	first = parseInt( first );
	second = parseInt( second );
	switch ( operation ){
	case 'AND':
		return ToUint16( first & second );
	case 'OR':
		return ToUint16( first | second );
	case 'LSHIFT': 
		return ToUint16( first << second );
	case 'RSHIFT': 
		return ToUint16( first >> second );
	case 'NOT': 
		return ToUint16( ~second );
	}
}

function resolve( wire, map ) {
	if ( wire.first && !wire.second && !wire.operator ) {
		return wire.first;
	}

	if ( wire.first && isNaN( wire.first )) {
		wire.first = findWirePower( map, wire.first );		
	}
	if ( wire.second && isNaN( wire.second )) {
		wire.second = findWirePower( map, wire.second );		
	}

	return execute( wire.first, wire.operator, wire.second );
}

function findWirePower( map, wireId ) {
	if ( wireId && map[wireId] ) {
		return resolve( map[wireId], map );
	} else {
		return wireId;
	}
}

function mapDestionations( inputs ) {
	var map = {};
	inputs.forEach( function( input ) {
		var matches = input.match( /^(.+) -> (.+)$/ );
		var operations = matches[1].match( /([0-9a-z]*)([ A-Z]*)(.*)/ );
		map[matches[2]] = {
			first: operations[1],
			operator: operations[2].trim(),
			second: operations[3]
		};
	} );
	return map;
}
var powerOnA = findWirePower( mapDestionations( input ), 'lx' );
console.log( powerOnA );

/*--- Part Two ---

Now, take the signal you got on wire a, override wire b to that signal, and reset the other wires (including wire a). What new signal is ultimately provided to wire a?*/

var map = mapDestionations( input );
map.b.first = powerOnA;
console.log( findWirePower( map, 'lx' ));
