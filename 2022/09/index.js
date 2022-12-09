const { parse } = require('../../utils')

const part1 = input => {
  const steps = parse(input)
  const visited = new Set(['0_0'])
  const directions = { L: [-1, 0], R: [1, 0], U: [0, -1], D: [0, 1] }

  let [hx, hy] = [0, 0]
  let [tx, ty] = [0, 0]

  const notTouching = (a, b) => Math.abs(a - b) > 1

  steps.forEach(step => {
    const [dir, d] = step.split(' ')
    const [x, y] = directions[dir]
    const dist = parseInt(d)

    hx += x * dist
    hy += y * dist

    while (notTouching(hx, tx) || notTouching(hy, ty)) {
      if (notTouching(hx, tx)) {
        tx += x
        if (hy > ty) ty++
        if (hy < ty) ty--
      }
      if (notTouching(hy, ty)) {
        ty += y
        if (hx > tx) tx++
        if (hx < tx) tx--
      }

      const pos = `${tx}_${ty}`
      if (!visited.has(pos)) visited.add(pos)
    }
  })

  return visited.size
}

const part2 = input => {
}

module.exports = {
  part1,
  part2,
}
