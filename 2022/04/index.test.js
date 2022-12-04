import { part1, part2, toRanges, contains, overlaps } from '.'

const input = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`

test('part 1', () => {
  expect(part1(input)).toBe(2)
})

test('part 2', () => {
  expect(part2(input)).toBe(4)
})

test('toRanges', () => {
  expect(toRanges('5-7,7-9')).toEqual([[5, 7], [7, 9]])
})

test('contains', () => {
  expect(contains([2, 4], [3, 4])).toBe(true)
  expect(contains([2, 4], [1, 4])).toBe(false)
})

test('overlaps', () => {
  expect(overlaps([2, 4], [3, 9])).toBe(true)
  expect(overlaps([2, 4], [5, 6])).toBe(false)
})
