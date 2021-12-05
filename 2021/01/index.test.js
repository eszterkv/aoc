import { countMeasurementIncreases } from '.'

const input = `
199
200
208
210
200
207
240
269
260
263
`

test('part 1: counts how many times the measurement increases', () => {
  expect(countMeasurementIncreases(input)).toBe(7)
})

test('part 2: counts how many times the measurement increases, using n-step windows', () => {
  expect(countMeasurementIncreases(input, 3)).toBe(5)
})
