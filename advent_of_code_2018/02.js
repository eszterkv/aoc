const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/02.test');

runTest(solve, tests.suite1);
runTest(solve2, tests.suite2);

fs.readFile('./inputs/02.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${solve(input)}`);
  console.log(`Part 2: ${solve2(input)}`);
});

function solve(input) {
  const arrays = input.split('\n').map(id => id.split('').sort());
  let twos = 0, threes = 0;
  arrays.forEach(arr => {
    if (arr.some(ch => countRepetitions(arr, ch) === 2)) twos++;
    if (arr.some(ch => countRepetitions(arr, ch) === 3)) threes++;
  });
  return twos * threes;
}

function countRepetitions(arr, el) {
  return arr.lastIndexOf(el) - arr.indexOf(el) + 1;
}

function solve2(input) {
  const boxes = input.split('\n');
  for (let a = 0; a < boxes.length - 1; a++) {
    for (let b = a + 1; b < boxes.length; b++) {
      let diff = 0, diffIdx;
      for (let i = 0; i < boxes[a].length; i++) {
        if (boxes[a][i] !== boxes[b][i]) {
          diff++;
          diffIdx = i;
        }
        if (diff > 1) continue;
      }
      if (diff === 1) {
        return boxes[a].substring(0, diffIdx).concat(boxes[a].substring(diffIdx + 1));
      }
    }
  }
}
