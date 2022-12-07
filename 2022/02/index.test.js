import { part1, part2, Move, getScore } from '.'

const input = `
A Y
B X
C Z
`

const A = new Move('A')
const B = new Move('B')
const C = new Move('C')
const X = new Move('X')
const Y = new Move('Y')
const Z = new Move('Z')

test('part 1', () => {
  expect(part1(input)).toBe(15)
})

test.skip('part 2', () => {
  //expect(part2(input)).toBe(45000)
})

test('Move', () => {
  expect(A.type).toBe('rock')
  expect(B.type).toBe('paper')
  expect(C.type).toBe('scissors')
  expect(X.type).toBe('rock')
  expect(Y.type).toBe('paper')
  expect(Z.type).toBe('scissors')

  expect(X.value).toBe(1)
  expect(Y.value).toBe(2)
  expect(Z.value).toBe(3)

  expect(X.vs(A)).toBe(3)
  expect(X.vs(B)).toBe(0)
  expect(X.vs(C)).toBe(6)
})

test('getScore', () => {
  expect(getScore(A, Y)).toBe(8)
  expect(getScore(B, X)).toBe(1)
  expect(getScore(C, Z)).toBe(6)
})
