const { parse } = require('../../utils')

const part1 = input => parse(input).reduce((sum, pair) => {
  const [min1, max1, min2, max2] = pair.match(/\d/g).map(n => parseInt(n))
  if (min1 >= min2 && max1 <= max2 || min1 <= min2 && max1 >= max2) sum++

  return sum
}, 0)

const part2 = input => parse(input).reduce((sum, pair) => {
  const [min1, max1, min2, max2] = pair.match(/\d/g).map(n => parseInt(n))
  if (!(min2 > max1 || min1 > max2)) sum++

  return sum
}, 0)

module.exports = {
  part1,
  part2,
}
