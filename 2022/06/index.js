const part1 = (input, markerLength = 4) => {
  const group = input.substr(0, markerLength).split('')

  for (let i = markerLength; i < input.length; i++) {
    if (group.every(ch => group.indexOf(ch) === group.lastIndexOf(ch)))
      return i

    group.shift()
    group.push(input[i])
  }
}

const part2 = input => part1(input, 14)

module.exports = {
  part1,
  part2,
}
