const { parse } = require('../../utils')

function countMeasurementIncreases(input, step = 1) {
  let count = 0
  const measurements = parse(input).map(n => parseInt(n))

  for (let i = 0; i < measurements.length - (step - 1); i++) {
    const a = sum(measurements.slice(i, i + step))
    const b = sum(measurements.slice(i + 1, i + 1 + step))

    if (b > a)
      count++
  }

  return count
}

const sum = arr => arr.reduce((acc, num) => acc + num, 0)

const part1 = countMeasurementIncreases
const part2 = input => countMeasurementIncreases(input, 3)

module.exports = {
  part1,
  part2,
  countMeasurementIncreases
}
