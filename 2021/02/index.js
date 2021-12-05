const { parse } = require('../../utils')

function multiplyPos(positionAlgo) {
  return function(input) {
    const instructions = parse(input).map(instruction => {
      const [direction, distance] = instruction.split(' ')

      return [direction, parseInt(distance)]
    })

    const { horizontal, depth } = positionAlgo(instructions)

    return horizontal * depth
  }
}

function navigateSimply(instructions) {
  const position = { horizontal: 0, depth: 0 }

  for (let [direction, distance] of instructions) {
    if (direction === 'forward') position.horizontal += distance
    if (direction === 'down') position.depth += distance
    if (direction === 'up') position.depth -= distance
  }

  return position
}

function navigateWithAim(instructions) {
  let aim = 0
  const position = { horizontal: 0, depth: 0 }

  for (let [direction, distance] of instructions) {
    if (direction === 'down') aim += distance
    if (direction === 'up') aim -= distance
    if (direction === 'forward') {
      position.horizontal += distance
      position.depth += aim * distance
    }
  }

  return position
}

const part1 = multiplyPos(navigateSimply)
const part2 = multiplyPos(navigateWithAim)

module.exports = {
  part1,
  part2,
  multiplyPos,
  navigateSimply,
  navigateWithAim,
}
