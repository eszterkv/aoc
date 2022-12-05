import { part1, part2 } from '.'

const input = `
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`

test('part 1', () => {
  expect(part1(input)).toBe('CMZ')
})

test('part 2', () => {
  expect(part2(input)).toBe('MCD')
})
