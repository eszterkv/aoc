const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/06.test');

runTest(solve, tests.suite1);
runTest(solve2, tests.suite2);

fs.readFile('./inputs/06.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
//  console.log(`Part 1: ${solve(input)}`);
//  console.log(`Part 2: ${solve2(input)}`);
});

function solve(input) {
  /*
   * 1, 1
     1, 6
     8, 3
     3, 4
     5, 5
     8, 9
  */
  const coords = input.split('\n').map(line => line.split(', ').map(coord => parseInt(coord)));
  const startX = coords.sort((a, b) => a[0] - b[0])[0][0],
        startY = coords.sort((a, b) => a[1] - b[1])[0][1],
        w = coords.sort((a, b) => b[0] - a[0])[0][0] - startX + 1,
        h = coords.sort((a, b) => b[1] - a[1])[0][1] - startY + 1;
  console.log(coords, startX, startY, w, h);
  let row = Array(w).fill('.'),
      matrix = [];
  for (let i = 0; i < h; i++) {
    matrix.push(row);
    row = row.slice(0);
  }
  coords.forEach((c, i) => {
    matrix[c[0]][c[1]] = i;
  });
  console.log(matrix);
}

function solve2(input) {
}
