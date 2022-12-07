const { parse, sum } = require('../../utils')

const golf = (input, n = 1) => sum(
  input.trim().split(/\n\n/)
    .map(elf => sum(elf.split(/\n/).map(e => parseInt(e))))
    .sort((a, b) => b - a)
    .slice(0, n)
)

function findElfWithMostCalories(input) {
  let max = 0
  let currentElfSum = 0

  for (const calories of parse(input)) {
    if (calories === '') {
      if (max < currentElfSum)
        max = currentElfSum

      currentElfSum = 0
    } else {
      currentElfSum += parseInt(calories)
    }
  }

  return max
}

function findElvesWithMostCalories(input, elves = 1) {
  let max = Array(elves).fill(0)
  let currentElfSum = 0

  for (const calories of [...parse(input), '']) {
    if (calories === '') {
      if (max[0] < currentElfSum) {
        max.shift()
        max = [...max, currentElfSum].sort((a, b) => a - b)
      }

      currentElfSum = 0
    } else {
      currentElfSum += parseInt(calories)
    }
  }

  return sum(max)
}

const part1 = findElfWithMostCalories
const part2 = input => findElvesWithMostCalories(input, 3)

module.exports = {
  part1,
  part2,
  golf,
}
