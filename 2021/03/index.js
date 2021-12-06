const { parse } = require('../../utils')

function calculatePowerConsumption(input) {
  const { gamma, epsilon } = getRates(parse(input))

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

function calculateLifeSupportRating(input) {
  const binaries = parse(input)
  const oxygen = findByBitCriteria(binaries, 'gamma')
  const co2 = findByBitCriteria(binaries, 'epsilon')

  return parseInt(oxygen, 2) * parseInt(co2, 2)
}

function getRates(binaries, start = 0, limit) {
  const size = limit ?? binaries[0].length
  const counts = Array(size).fill(0).map(() => [0, 0])

  for (const binary of binaries) {
    for (let pos = start; pos < start + size; pos++) {
      const val = binary[pos]
      counts[pos - start][val]++
    }
  }

  const mostCommon = counts.reduce((result, [zeroes, ones]) => {
    result += (zeroes > ones ? '0' : '1')
    return result
  }, '')

  const leastCommon = invertBinary(mostCommon)

  return { gamma: mostCommon, epsilon: leastCommon }
}

function findByBitCriteria(binaries, criteria, pos = 0) {
  const limit = 1
  const matcher = getRates(binaries, pos, limit)[criteria]
  const binariesMatchingCriteria = binaries.filter(bin => bin[pos] === matcher)

  if (binariesMatchingCriteria.length <= 1)
    return binariesMatchingCriteria[0]

  pos++
  return findByBitCriteria(binariesMatchingCriteria, criteria, pos)
}

function invertBinary(binary) {
  let result = ''
  for (let digit of binary)
    result += digit === '0' ? '1' : '0'

  return result
}

const part1 = calculatePowerConsumption
const part2 = calculateLifeSupportRating

module.exports = {
  part1,
  part2,
  getRates,
  invertBinary,
  findByBitCriteria,
  calculatePowerConsumption,
  calculateLifeSupportRating,
}
