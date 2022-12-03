const { parse } = require('../../utils')

const score = (opp, move) => {
  move = move.charCodeAt() - 87
  opp = opp.charCodeAt() - 64
  if (opp === move) return 3
  if (move - opp === -2 || move > opp) return 6
  return 0
}

const part1 = input => parse(input).map(r => r.split(' ')).reduce((acc, [opp, move]) =>
  acc + score(opp, move) + move.charCodeAt() - 87, 0)

class Move {
  constructor(input) {
    this.input = input

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

  findMove(result) {
    let move

    if (result === 'Y') move = this.input
    if (result === 'X') move = this.findLosingMove(result)
    if (result === 'Z') move = this.findWinningMove(result)

    return new Move(move)
  }

  findLosingMove() {
    if (this.type === 'rock') return 'C'
    if (this.type === 'paper') return 'A'
    if (this.type === 'scissors') return 'B'
  }

  findWinningMove() {
    if (this.type === 'rock') return 'B'
    if (this.type === 'paper') return 'C'
    if (this.type === 'scissors') return 'A'
  }
}

const getScore = (opponent, move) => move.vs(opponent) + move.value

const part2 = input => {
  const rounds = parse(input).map(round => [new Move(round[0]), round[2]])

  return rounds.reduce((score, [opponent, move]) =>
    score + getScore(opponent, opponent.findMove(move)), 0)
}

module.exports = {
  part1,
  part2,
  Move,
  getScore,
}
