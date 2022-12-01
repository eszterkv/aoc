const { parse, sum } = require('../../utils')

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

const part1 = findElvesWithMostCalories
const part2 = input => findElvesWithMostCalories(input, 3)

module.exports = {
  part1,
  part2,
}
