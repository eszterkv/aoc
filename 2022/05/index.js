const { parse } = require('../../utils')

const part1 = input => {
  const [stacksStr, movesStr] = input.split(/\n\n/)
  const lines = stacksStr.split(/\n/)

  let stacks = {}

  for (let line = 0; line < lines.length - 1; line++) {
    let stack = 0

    for (let i = 1; i < lines[line].length; i += 4) {
      stack++

      const item = lines[line][i]
      if (item === ' ') continue

      if (stack in stacks) stacks[stack].push(item)
      else stacks[stack] = [item]
    }
  }

  const moves = parse(movesStr)
  moves.forEach(move => {
    const [n, source, dest] = move.match(/\d+/g)
    for (let i = 0; i < parseInt(n); i++)
      stacks[dest].unshift(stacks[source]?.shift())
  })

  return Object.values(stacks).map(items => items[0]).join('')
}

const part2 = input => {}

module.exports = {
  part1,
  part2,
}
