import { parse, sum } from '.'

const testInput = `
1
2
4
3
`

describe('utils', () => {
  test('parse turns raw input into an array of strings', () => {
    expect(parse(testInput)).toEqual(['1', '2', '4', '3'])
  })

  test('sum sums the numbers in an array', () => {
    expect(sum([])).toEqual(0)
    expect(sum([4, 500])).toEqual(504)
  })
})
