import countMeasurementIncreases from '.'

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
