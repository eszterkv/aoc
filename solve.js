const problem = process.argv[2]

if (!problem) {
  console.log('⚠️  Please pass a problem to solve, e.g. yarn solve 2021/01\n')
  return
}

const solver = require(`./${problem}/index.js`)
const input = require('fs').readFileSync(`./${problem}/input.txt`, 'utf8')
const solution = solver(input)

console.log(`The solution for ${problem} is: ${solution}`)
