const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/06.test');

runTest(solve, tests.suite1);
//runTest(solve2, tests.suite2);

fs.readFile('./inputs/06.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
//  console.log(`Part 1: ${solve(input)}`);
//  console.log(`Part 2: ${solve2(input)}`);
});

/* get list of coords
 * find the coord that gives you the largest distance from others?
 * determine the area around each point
 *   by counting the locations that are closest to that coord (no ties!)
 * what is the SIZE of largest area that isn't infinite?
 */

function solve(input) {
  /*
   * 1, 1
     1, 6
     8, 3
     3, 4
     5, 5
     8, 9
  */
  const coords = parseCoords(input);
  const startX = coords.reduce((start, curr) => Math.min(start, curr[0]), Infinity),
        startY = coords.reduce((start, curr) => Math.min(start, curr[1]), Infinity),
        w = coords.reduce((size, curr) => Math.max(size, curr[0]), -Infinity),
        h = coords.reduce((size, curr) => Math.max(size, curr[1]), -Infinity);

  console.log(
    'coords:', coords,
    '\nstart X and Y:', startX, startY,
    '\nw, h:', w, h,
  );

  const matrix = buildMatrix(coords, startX, startY, w, h);
  printMatrix(matrix);

  const validPoints = pointsWithFiniteArea(coords, matrix, startX, startY, w, h);
  console.log(validPoints);
}

function parseCoords(input) {
  return input.split('\n').map(line => line.split(', ').map(coord => parseInt(coord)));
}

function buildMatrix(coords, startX, startY, w, h) {
  let row = Array(w).fill('.'),
      matrix = [];
  for (let i = 0; i < h; i++) {
    matrix.push(row);
    row = row.slice(0);
  }
  coords.forEach((point, idx) => {
    matrix[point[1] - startX][point[0] - startY] = idx.toString();
  });

  return matrix;
}

function pointsWithFiniteArea(points, matrix, startX, startY, w, h) {
  return points.filter(point =>
    point[0] - startX > 0 &&
    point[0] - startX < w - 1 &&
    point[1] - startY > 0 &&
    point[1] - startY < h - 1
  );
}

function printMatrix(matrix) {
  console.log(
    matrix
      .map(row => row.join(''))
      .join('\n')
  );
}

function solve2(input) {
}
