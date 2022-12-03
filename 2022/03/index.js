const { parse } = require('../../utils')

const priorities = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const part1 = input => {
  const rucksacks = parse(input)
  let sum = 0

  rucksacks.forEach(rucksack => {
    const items = rucksack.split('')
    const seen = new Set(items.splice(0, rucksack.length / 2))

    while (items.length) {
      const item = items.pop()
      if (seen.has(item)) {
        sum += priorities.indexOf(item)
        break
      }
    }
  })

  return sum
}

const part2 = input => {
  const elves = parse(input)

  let sum = 0
  let firstElf
  let shared = new Set()

  for (let i = 0; i < elves.length; i++) {
    const items = elves[i].split('')

    if (i % 3 === 0) {
      firstElf = new Set(items)
      shared = new Set()
    } else if (i % 3 === 1) {
      items.forEach(item => {
        if (firstElf.has(item)) shared.add(item)
      })
    } else {
      while (items.length) {
        const item = items.pop()
        if (shared.has(item)) {
          sum += priorities.indexOf(item)
          break
        }
      }
    }
  }

  return sum
}

module.exports = {
  part1,
  part2,
}
