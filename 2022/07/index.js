const { parse, sum } = require('../../utils')

class Node {
  constructor(name, parent = null) {
    this.name = name
    this.parent = parent
    this.val = 0
    this.children = []
  }

  addChild(child) {
    this.children.push(child)
  }
}

const part1 = input => {
  const lines = parse(input)
  const root = new Node('/')
  const nodes = new Set()

  let currentNode = root

  lines.forEach(line => {
    if (line.match(/^\$ cd \.\./)) currentNode = currentNode.parent

    const file = line.match(/^\d+/)?.[0] || 0
    if (file) currentNode.val += Number(file)

    const name = line.match(/^\$ cd (\w+)/)?.[1]
    if (name) {
      const dir = new Node(name, currentNode)
      currentNode.addChild(dir)
      currentNode = dir
    }

    if (!(currentNode in nodes)) nodes.add(currentNode)
  })

  const sumFiles = currentNode => {
    let val = currentNode.val
    if (currentNode.val > 100_000) return 0

    if (currentNode.children.length > 0)
      return val + sum(currentNode.children.map(sumFiles))

    return val
  }

  const childrenValid = ({ children, val }) => children.length === 0
    ? val <= 100_000
    : children.every(childrenValid)

  let total = 0

  nodes.forEach(node => {
    if (childrenValid(node)) {
      const s = sumFiles(node)
      if (s <= 100_000)
        total += s
    }
  })

  return total
}

const part2 = input => {}

module.exports = {
  part1,
  part2,
}
