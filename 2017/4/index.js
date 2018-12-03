let input = require('./input')
input = input.split('\n')

const validPF = input.filter(input => {
  const passfraseSplit = input.split(' ');
  const withoutDuplicates = Array.from(new Set(passfraseSplit))
  return withoutDuplicates.length===passfraseSplit.length
})

console.log(validPF.length)

const validPFSorted = input.filter(input => {
  const passfraseSplit = input.split(' ').map(word => word.split('').sort().join(''));
  const withoutDuplicates = Array.from(new Set(passfraseSplit))
  return withoutDuplicates.length===passfraseSplit.length
})

console.log(validPFSorted.length)