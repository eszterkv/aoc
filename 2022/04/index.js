const { parse } = require('../../utils')

const toRanges = pair => pair.split(',').map(range => range.split('-').map(n => parseInt(n)))

const contains = ([min1, max1], [min2, max2]) => min1 <= min2 && max1 >= max2

const overlaps = ([min1, max1], [min2, max2]) => !(min2 > max1 || min1 > max2)

const part1 = input => parse(input).reduce((sum, pair) => {
  const [range1, range2] = toRanges(pair)
  if (contains(range1, range2) || contains(range2, range1)) sum++

  return sum
}, 0)

const part2 = input => parse(input).reduce((sum, pair) => {
  const [range1, range2] = toRanges(pair)
  if (overlaps(range1, range2)) sum++

  return sum
}, 0)

module.exports = {
  part1,
  part2,
  toRanges,
  contains,
  overlaps,
}
