const { parse } = require('../../utils')

class Move {
  constructor(input) {
    if (['A', 'X'].includes(input)) {
      this.type = 'rock'
      this.value = 1
    } else if (['B', 'Y'].includes(input)) {
      this.type = 'paper'
      this.value = 2
    } else if (['C', 'Z'].includes(input)) {
      this.type = 'scissors'
      this.value = 3
    }
  }

  vs(opponent) {
    if (opponent.type === this.type)
      return 3
    if (opponent.type === 'rock' && this.type === 'scissors')
      return 0
    if (this.type === 'rock' && opponent.type === 'scissors')
      return 6
    if (opponent.value > this.value)
      return 0
    if (opponent.value < this.value)
      return 6
  }
}

const getScore = (opponent, move) => move.vs(opponent) + move.value

const part1 = input => {
  const rounds = parse(input)
    .map(round => round.split(' ').map(move => new Move(move)))

  return rounds.reduce((score, [opponent, move]) =>
    score + getScore(opponent, move), 0)
}

const part2 = () => {}

module.exports = {
  part1,
  part2,
  Move,
  getScore,
}
