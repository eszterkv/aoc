const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/03.test');

runTest(solve, tests.suite1);
runTest(solve2, tests.suite2);

fs.readFile('./inputs/03.input', 'utf8', (err, data) => {
  /* How many square inches of fabric are within two or more claims? */
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${solve(input)}`);
  console.log(`Part 2: ${solve2(input)}`);
});

function solve(input) {
  const {matrix} = createMatrix(input);
  return matrix.reduce((sum, line) => sum + line.filter(n => n > 1).length, 0);
}

function solve2(input) {
  const {matrix, claims} = createMatrix(input);
  const filtered = claims.filter(c => {
    for (let i = c.y; i < c.y + c.h; i++) {
      for (let j = c.x; j < c.x + c.w; j++) {
        if (matrix[i][j] > 1) return false;
      }
    };
    return true;
  });
  return filtered[0].idx;
}

function createMatrix(input) {
  const size = 1000;
  const claims = input.split('\n').map(line => {
    let [idx, info] = line.split('@ ');
    idx = parseInt(idx.substring(1));
    const [coords, size] = info.split(': ');
    const [x, y] = coords.split(',').map(n => parseInt(n)),
          [w, h] = size.split('x').map(n => parseInt(n));
    return {idx, x, y, w, h};
  });
  let row = Array(size).fill(0);
  let matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push(row);
    row = row.slice(0);
  }
  claims.forEach(c => {
    for (let i = c.y; i < c.y + c.h; i++) {
      for (let j = c.x; j < c.x + c.w; j++) {
        matrix[i][j] += 1;
      }
    }
  });
  return {matrix, claims};
}
