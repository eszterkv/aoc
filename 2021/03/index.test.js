import {
  getRates,
  invertBinary,
  findByBitCriteria,
  calculatePowerConsumption,
  calculateLifeSupportRating,
} from '.'
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
  expect(getRates(parse(input))).toEqual({ gamma: '10110', epsilon: '01001' })
})

test('getRates with position and limit', () => {
  expect(getRates(parse(input), 0, 1)).toEqual({ gamma: '1', epsilon: '0' })
  expect(getRates(parse(input), 1, 1)).toEqual({ gamma: '0', epsilon: '1' })
})

test('invertBinary', () => {
  expect(invertBinary('10101')).toBe('01010')
})

test('findByBitCriteria', () => {
  expect(findByBitCriteria(parse(input), 'gamma')).toBe('10111')
})

test('part 1: calculates power consumption', () => {
  expect(calculatePowerConsumption(input)).toBe(198)
})

test('part 2: calculates life support rating', () => {
  expect(calculateLifeSupportRating(input)).toBe(230)
})
