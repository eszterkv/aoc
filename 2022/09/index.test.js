import { part1, part2 } from '.'

const input = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`

test('part 1', () => {
  expect(part1(input)).toBe(13)
})

test.skip('part 2', () => {
  expect(part2(input)).toBe(8)
})
