const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/05.test');

runTest(solve, tests.suite1);
runTest(solve2, tests.suite2);

fs.readFile('./inputs/05.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${solve(input)}`);
  console.log(`Part 2: ${solve2(input)}`);
});

function solve(input) {
  let i = 0;
  while (i < input.length - 1) {
    if (input[i].toLowerCase() === input[i + 1].toLowerCase() && input[i] !== input[i + 1]) {
      input = input.substring(0, i).concat(input.substring(i + 2));
      if (i > 0) i--;
    }
    else i++;
  }
  return input.length;
}

function solve2(input) {
  return Math.min.apply(null, alphas().map(
    alpha => solve(input.split('').filter(ch => ch.toLowerCase() !== alpha).join(''))
  ));
}

function alphas() {
  const alphas = [];
  for (let i = 'a'.charCodeAt(0); i < 'z'.charCodeAt(0) + 1; i++) {
    alphas.push(String.fromCharCode(i));
  }
  return alphas;
}
