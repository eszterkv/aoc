const { parse } = require('../../utils')

const buildStacks = stacksStr => stacksStr.split(/\n/).reduce((stacks, line) => {
  let stack = 0
  for (let i = 1; i < line.length; i += 4) {
    stack++
    const item = line[i]
    if (/[\s\d]/.test(item)) continue

    if (stack in stacks) stacks[stack].push(item)
    else stacks[stack] = [item]
  }

  return stacks
}, {})

const part1 = input => {
  const [stacksStr, movesStr] = input.split(/\n\n/)
  const stacks = buildStacks(stacksStr)
  const moves = parse(movesStr)

  moves.forEach(move => {
    const [n, source, dest] = move.match(/\d+/g)
    for (let i = 0; i < parseInt(n); i++)
      stacks[dest].unshift(stacks[source]?.shift())
  })

  return Object.values(stacks).map(items => items[0]).join('')
}

const part2 = input => {
  const [stacksStr, movesStr] = input.split(/\n\n/)
  const stacks = buildStacks(stacksStr)
  const moves = parse(movesStr)

  moves.forEach(move => {
    const [n, source, dest] = move.match(/\d+/g)
    const items = stacks[source]?.splice(0, parseInt(n))
    stacks[dest] = [...items, ...stacks[dest]]
  })

  return Object.values(stacks).map(items => items[0]).join('')
}

module.exports = {
  part1,
  part2,
}
