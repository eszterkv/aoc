import { part1, part2 } from '.'

const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`

test('part 1', () => {
  expect(part1(input)).toBe(157)
})

test('part 2', () => {
  expect(part2(input)).toBe(70)
})
