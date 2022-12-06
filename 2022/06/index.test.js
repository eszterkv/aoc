import { part1, part2 } from '.'

const testCases = [
  { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expected: 7 },
  { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expected: 5 },
  { input: 'nppdvjthqldpwncqszvftbrmjlhg', expected: 6 },
  { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expected: 10 },
  { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expected: 11 },
]

test('part 1', () => {
  testCases.forEach(({ input, expected }) => {
    expect(part1(input)).toBe(expected)
  })
})

test.skip('part 2', () => {
})
