import { parse } from '.'

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
})
