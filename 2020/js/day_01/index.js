const fs = require('fs')
const { performance } = require('perf_hooks')

fs.readFile('./input.txt', 'utf8', (err, data) => {
  const start = performance.now()

  if (err) throw err

  const input = data.trim().split('\n').map(Number)

  console.log(`Part 1: ${part1(input)}`);

  const duration = performance.now() - start
  console.log(`Time elapsed: ${(duration * 1000).toFixed(3)}µs`)
})

function part1(numbers) {
  const seen = new Set()

  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i]

    if (seen.has(num)) {
      return num * (2020 - num)
    } else {
      seen.add(2020 - num)
    }
  }
}
