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

const createNodes = input => {
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
  return { nodes, root }
}

const part1 = input => {
  const { nodes } = createNodes(input)

  const sumFiles = ({ val, children }) => {
    if (val > 100_000)
      return 0

    return children.length > 0
      ? val + sum(children.map(sumFiles))
      : val
  }

  const childrenValid = ({ children, val }) =>
    children.length === 0
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

const part2 = input => {
  const { nodes, root } = createNodes(input)

  const sumFiles = ({ val, children }) => {
    if (children.length > 0)
      return val + sum(children.map(sumFiles))

    return val
  }

  let smallest = Number.MAX_SAFE_INTEGER

  const diskSpace = 70000000
  const updateSize = 30000000
  const freeDiskSpace = diskSpace - sumFiles(root)
  const spaceNeeded = updateSize - freeDiskSpace

  nodes.forEach(node => {
    const s = sumFiles(node)
    if (s >= spaceNeeded && s < smallest) smallest = s
  })

  return smallest
  // 11133322 too high
}

module.exports = {
  part1,
  part2,
}
