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

const testCases2 = [
  { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expected: 19 },
  { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expected: 23 },
  { input: 'nppdvjthqldpwncqszvftbrmjlhg', expected: 23 },
  { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expected: 29 },
  { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expected: 26 },
]

test('part 2', () => {
  testCases2.forEach(({ input, expected }) => {
    expect(part2(input)).toBe(expected)
  })
})
