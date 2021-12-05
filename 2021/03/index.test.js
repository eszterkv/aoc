import { getRates, invertBinary, calculatePowerConsumption } from '.'
import { parse } from '../../utils'

const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`

test('getRates', () => {
  expect(getRates(parse(input))).toEqual({ gamma: 22, epsilon: 9 })
})

test('invertBinary', () => {
  expect(invertBinary('10101')).toBe('01010')
})

test('part 1: calculates power consumption', () => {
  expect(calculatePowerConsumption(input)).toBe(198)
})

test.todo('part 2:')
