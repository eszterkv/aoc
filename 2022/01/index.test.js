import { part1, part2, golf } from '.'

const input = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

test('part 1: find the calories carried by the elf with the most calories', () => {
  expect(part1(input)).toBe(24000)
})

test('part 2: find the calories carried by the top 3 elves', () => {
  expect(part2(input)).toBe(45000)
})

test('golf part 1', () => {
  expect(golf(input)).toBe(24000)
  expect(golf(input, 3)).toBe(45000)
})
