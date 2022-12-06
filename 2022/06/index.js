const part1 = input => {
  const group = input.substr(0, 4).split('')

  for (let i = 4; i < input.length; i++) {
    if (group.every(ch => group.indexOf(ch) === group.lastIndexOf(ch))) return i
    group.shift()
    group.push(input[i])
  }
}

const part2 = input => {
}

module.exports = {
  part1,
  part2,
}
