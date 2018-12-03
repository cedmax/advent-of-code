/*--- Day 11: Corporate Policy ---

Santa's previous password expired, and he needs help choosing a new one.

To help him remember his new password after the old one expires, Santa has devised a method of coming up with a password based on the previous one. Corporate policy dictates that passwords must be exactly eight lowercase letters (for security reasons), so he finds his new password by incrementing his old password string repeatedly until it is valid.

Incrementing is just like counting with numbers: xx, xy, xz, ya, yb, and so on. Increase the rightmost letter one step; if it was z, it wraps around to a, and repeat with the next letter to the left until one doesn't wrap around.

Unfortunately for Santa, a new Security-Elf recently started, and he has imposed some additional password requirements:

    Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
    Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
    Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.

For example:

    hijklmmn meets the first requirement (because it contains the straight hij) but fails the second requirement requirement (because it contains i and l).
    abbceffg meets the third requirement (because it repeats bb and ff) but fails the first requirement.
    abbcegjk fails the third requirement, because it only has one double letter (bb).
    The next password after abcdefgh is abcdffaa.
    The next password after ghijklmn is ghjaabcc, because you eventually skip all the passwords that start with ghi..., since i is not allowed.

Given Santa's current password (your puzzle input), what should his next password be?*/

var fs = require( 'fs' );
var input = fs.readFileSync( 'input/11.txt', 'utf-8' );

function toLetters(input) {
	input = (+input).toString(26);
	var ret = [];
	while (input.length) {
		var a = input.charCodeAt(input.length-1);
		if (input.length > 1)
			input = (parseInt(input.substr(0, input.length - 1), 26) - 1).toString(26);
		else
			input = '';

		if (a >= 48/*'0'*/ && a <= 57 /*'9'*/)
			ret.unshift(String.fromCharCode(a + 49)); //raise to += 'a'
		else
			ret.unshift(String.fromCharCode(a + 10)); //raise + 10 (make room for 0-9)
	}
	return ret.join('');
}

function fromLetters(str) {
	var out = 0, len = str.length, pos = len;
	while (--pos > -1) {
		out += (str.charCodeAt(pos) - 96) * Math.pow(26, len - 1 - pos);
	}
	return out;
}

function increment(input){
	return toLetters(fromLetters(input));
}

function consecutives(input){
	for (var i=0, l=input.length; i+2<l;i++){
		var check = [
			fromLetters(input[i]),
			fromLetters(input[i+1]),
			fromLetters(input[i+2])
		];

		if (check[2]-check[1] === 1 && check[1]-check[0]===1) {
			return true;
		}
	}
	return false;
}

function matchRules(input){
	var cons = consecutives(input);
	var doubles = input.match(/(.)\1/g) && input.match(/(.)\1/g).length>1;
	var excludes = !input.match(/i|o|l/g);
	return cons && doubles && excludes;
}

while (!matchRules(input)){
	input = increment(input);
}

console.log(input);
input = increment(input);

/*--- Part Two ---

Santa's password expired again. What's the next one?*/

while (!matchRules(input)){
	input = increment(input);
}

console.log(input);
