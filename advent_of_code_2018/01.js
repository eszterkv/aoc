const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/01.test');

runTest(solve, tests.suite1);
runTest(solve2, tests.suite2);

fs.readFile('./inputs/01.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${solve(input)}`);
  console.log(`Part 2: ${solve2(input)}`);
});

function solve(input) {
  return input.split('\n')
    .reduce((sum, diff) => sum + (diff[0] === '+' ? 1 : -1) * parseInt(diff.substring(1)), 0);
}

/* Note: the key to performance was using a set instead of an array. */
function solve2(input) {
  let freq = 0;
  const changes = input.split('\n').map(diff => (diff[0] === '+' ? 1 : -1) * parseInt(diff.substring(1)));
  const freqs = new Set([0]);
  while (true) {
    for (let i = 0; i < changes.length; i++) {
      freq += changes[i];
      if (freqs.has(freq)) {return freq;}
      freqs.add(freq);
    };
  }
}

