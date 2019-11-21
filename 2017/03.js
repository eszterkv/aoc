const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/03.test');

runTest(spiralMemory, tests.suite1);
runTest(spiralMemoryPt2, tests.suite2);

fs.readFile('./inputs/03.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = parseInt(data.trim());
  console.log(`Part 1: ${spiralMemory(input)}`);
  console.log(`Part 2: ${spiralMemoryPt2(input)}`);
});

function spiralMemory(input) {
  const ringSize = getRingSize(input);
  return Math.floor(ringSize / 2) * 2 - Math.abs(getClosestCorner(input, ringSize) - input);
}

function getRingSize(num) {
  const ceilSqrt = Math.ceil(Math.sqrt(num));
  return ceilSqrt % 2 == 1 ? ceilSqrt : ceilSqrt + 1;
}

function getClosestCorner(input, ringSize) {
  const lastCorner = Math.pow(ringSize, 2);
  return [0, 1, 2, 3].map((n) => lastCorner - n * (ringSize - 1))
         .sort((a, b) => Math.abs(a - input) - Math.abs(b - input))[0];
}

function spiralMemoryPt2(input) {
  let lastSquare = 1;
  let idx = 1;
  let matrix = [];
  const size = 100;
  for (let i = 0; i < size; i++) {
    matrix[i] = Array.apply(null, Array(size)).map(Number.prototype.valueOf, 0);
  }
  const center = size / 2;
  let x = center;
  let y = center;
  matrix[x][y] = lastSquare;
  while (lastSquare < input + 1) {
    idx++;
    ringSize = getRingSize(idx);
    const corners = [0, 1, 2, 3].map((n) => Math.pow(ringSize, 2) - n * (ringSize - 1)).reverse();

    if (idx == Math.pow(ringSize - 2, 2) + 1) {
      y++;
    } else if (idx <= corners[0]) {
      x--;
    } else if (idx <= corners[1]) {
      y--;
    } else if (idx <= corners[2]) {
      x++;
    } else {
      y++;
    }

    lastSquare = [
      matrix[x-1][y-1],
      matrix[x-1][y],
      matrix[x-1][y+1],
      matrix[x][y-1],
      matrix[x][y+1],
      matrix[x+1][y-1],
      matrix[x+1][y],
      matrix[x+1][y+1]
    ].reduce((sum, val) => sum + val);

    matrix[x][y] = lastSquare;
  }
  return lastSquare;
}
