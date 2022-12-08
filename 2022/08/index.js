const { parse } = require('../../utils')

const part1 = input => {
  const grid = parse(input).map(row => row.split('').map(n => parseInt(n)))
  const h = grid.length - 1
  const w = grid[0].length - 1

  let visibleCount = (w + h) * 2
  let seen = new Set()
  let tallestTop = grid[0]

  for (let i = 1; i < h; i++) {
    let tallestLeft = grid[i][0]
    for (let j = 1; j < h; j++) {

      const tree = grid[i][j]
      let treeVisible = false

      if (tree > tallestLeft) {
        tallestLeft = tree
        treeVisible = true
      }
      if (tree > tallestTop[j]) {
        tallestTop[j] = tree
        treeVisible = true
      }

      if (treeVisible) {
        seen.add(`${i}_${j}`)
        visibleCount++
      }
    }
  }

  let tallestBottom = grid[h]

  for (let i = h - 1; i > 0; i--) {
    let tallestRight = grid[i][w]
    for (let j = w - 1; j > 0; j--) {
      const tree = grid[i][j]
      const id = `${i}_${j}`

      let treeVisible = false

      if (tree > tallestRight) {
        tallestRight = tree
        treeVisible = true
      }
      if (tree > tallestBottom[j]) {
        tallestBottom[j] = tree
        treeVisible = true
      }

      if (seen.has(id)) continue
      if (treeVisible) visibleCount++
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
