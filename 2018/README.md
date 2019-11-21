# Advent of Code 2018

My solutions to [advent of code 2018](http://adventofcode.com/2018).

## To run
`node 01` for day one, guess for the rest. :)

## File structure

```js
const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/some.test');

runTest(solve, tests.suite1);
runTest(solve2, tests.suite2);

fs.readFile('./inputs/some.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${solve(input)}`);
  console.log(`Part 2: ${solve(input)}`);
});

function solve(input) {
  /* magic */
}
```

