import { multiplyPos, navigateSimply, navigateWithAim } from '.'

const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`

test('part 1: solves with simple 2d algo', () => {
  expect(multiplyPos(navigateSimply)(input)).toBe(150)
})

test('part 2: solves with aim algo', () => {
  expect(multiplyPos(navigateWithAim)(input)).toBe(900)
})
