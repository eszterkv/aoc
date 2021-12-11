class Board {
  numbers = []
  size = 5
  found = ''
  lastCalledNumber

  constructor(boardInput, size = 5) {
    this.numbers = boardInput.trim().split(/\W+/).map(n => parseInt(n))
    this.size = size
    this.found = new Array(size * size + 1).join('-')
  }

  isWinner() {
    return /^((.{5}){0,4})?x{5}|(x....){5}|(.x...){5}|(..x..){5}|(...x.){5}|(....x){5}/
      .test(this.found)
  }

  reset() {
    this.found = new Array(this.size * this.size + 1).join('-')
  }

  stepsToWin(numbers) {
    let steps = 0
    for (let n of numbers) {
      steps++
      const idx = this.numbers.indexOf(n)

      if (idx > -1) {
        const updated = this.found.split('')
        updated[idx] = 'x'
        this.found = updated.join('')
        this.lastCalledNumber = n
      }

      if (this.isWinner()) return steps
    }

    return Infinity
  }

  getUnmarkedNumbers() {
    return this.numbers.filter((_, idx) => this.found[idx] !== 'x')
  }
}

function parseBingoInput(input) {
  const trimmed = input.trim()
  const [numbersInput, ...boardsInput] = trimmed.split('\n\n')
  const numbers = numbersInput.split(',').map(n => parseInt(n))
  const boards = boardsInput.map(input => new Board(input))

  return { numbers, boards }
}

function findScore(input, { reverse } = {}) {
  const { numbers, boards } = parseBingoInput(input)

  const winner = boards.sort((a, b) => {
    const aSteps = a.stepsToWin(numbers)
    const bSteps = b.stepsToWin(numbers)
    a.reset()
    b.reset()

    return reverse
      ? bSteps - aSteps
      : aSteps - bSteps
  })[0]

  winner.stepsToWin(numbers)

  return sum(winner.getUnmarkedNumbers()) * winner.lastCalledNumber
}

function sum(arr) {
  return arr.reduce((sum, n) => sum + n, 0)
}

const part1 = findScore
const part2 = input => findScore(input, { reverse: true })

module.exports = {
  part1,
  part2,
  parseBingoInput,
  findScore,
  Board,
}
