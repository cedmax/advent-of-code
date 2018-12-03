const input = `{}{{{}}}{{},{}}{{{},{},{{}}}}{<{},{},{{}}>}{<a>,<a>,<a>,<a>}{{<a>},{<a>},{<a>},{<a>}}{{<!>},{<!>},{<!>},{<a>}}`
const withoutSureGarbage = input.replace(/(<[^!>]+>)/g, '')

console.log(withoutSureGarbage)