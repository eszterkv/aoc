// count the number of times a depth measurement increases from the previous measurement
const { parse } = require('../../utils')

module.exports = function countMeasurementIncreases(input) {
  let count = 0
  const measurements = parse(input).map(n => parseInt(n))

  for (let i = 1; i < measurements.length; i++)
    if (measurements[i] > measurements[i - 1])
      count++

  return count
}
