const problem = process.argv[2]

if (!problem) {
  console.log('⚠️  Please pass a problem to solve, e.g. yarn solve 2021/01\n')
  return
}

const { part1, part2 } = require(`./${problem}/index.js`)
const input = require('fs').readFileSync(`./${problem}/input.txt`, 'utf8')
const solutionPart1 = part1(input)
const solutionPart2 = part2(input)

console.log(`
${problem}
part 1: ${solutionPart1}
part 2: ${solutionPart2}
`)
