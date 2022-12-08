import { part1, part2 } from '.'

const input = `
30373
25512
65332
33549
35390
`

test('part 1', () => {
  expect(part1(input)).toBe(21)
})

test('part 2', () => {
  expect(part2(input)).toBe(8)
})
