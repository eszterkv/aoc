const { parse } = require('../../utils')

const part1 = input => {
  const grid = parse(input).map(row => row.split('').map(n => parseInt(n)))
  const [w, h] = [grid[0].length - 1, grid.length - 1]

  let visibleCount = (w + h) * 2
  let seen = new Set()
  let tallestTop = grid[0]

  for (let i = 1; i < h; i++) {
    let tallestLeft = grid[i][0]
    for (let j = 1; j < h; j++) {
      const tree = grid[i][j]

      if (tree > tallestLeft || tree > tallestTop[j]) {
        seen.add(`${i}_${j}`)
        visibleCount++
      }

      if (tree > tallestLeft) tallestLeft = tree
      if (tree > tallestTop[j]) tallestTop[j] = tree
    }
  }

  let tallestBottom = grid[h]

  for (let i = h - 1; i > 0; i--) {
    let tallestRight = grid[i][w]
    for (let j = w - 1; j > 0; j--) {
      const tree = grid[i][j]
      const id = `${i}_${j}`

      if (!seen.has(id) && (tree > tallestRight || tree > tallestBottom[j])) visibleCount++

      if (tree > tallestRight) tallestRight = tree
      if (tree > tallestBottom[j]) tallestBottom[j] = tree
    }
  }

  return visibleCount
}

const part2 = input => {
}

module.exports = {
  part1,
  part2,
}
