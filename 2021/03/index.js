const { parse } = require('../../utils')

function calculatePowerConsumption(input) {
  const { gamma, epsilon } = getRates(parse(input))

  return gamma * epsilon
}

function getRates(binaries) {
  const size = binaries[0].length
  const counts = Array(size).fill(0).map(() => [0, 0])

  for (const binary of binaries) {
    for (let pos = 0; pos < size; pos++) {
      const val = binary[pos]
      counts[pos][val]++
    }
  }

  const mostCommon = counts.reduce((result, [zeroes, ones]) => {
    result += (zeroes > ones ? '0' : '1')
    return result
  }, '')

  const leastCommon = invertBinary(mostCommon)

  return { gamma: parseInt(mostCommon, 2), epsilon: parseInt(leastCommon, 2) }
}

function invertBinary(binary) {
  let result = ''
  for (let digit of binary)
    result += digit === '0' ? '1' : '0'

  return result
}

const part1 = calculatePowerConsumption
const part2 = calculatePowerConsumption

module.exports = {
  part1,
  part2,
  getRates,
  invertBinary,
  calculatePowerConsumption,
}
