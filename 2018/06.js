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
 * determine the area around each point
 *   by counting the locations that are closest to that coord (no ties!)
 * what is the SIZE of largest area that isn't infinite?
 */

function solve(input) {
  const coords = parseCoords(input);
  const startX = coords.reduce((start, curr) => Math.min(start, curr[0]), Infinity),
        startY = coords.reduce((start, curr) => Math.min(start, curr[1]), Infinity),
        w = coords.reduce((size, curr) => Math.max(size, curr[0]), -Infinity),
        h = coords.reduce((size, curr) => Math.max(size, curr[1]), -Infinity);

  const matrix = buildMatrix(coords, startX, startY, w, h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (matrix[x][y] !== '.')
        continue;

      const distances = coords
        .map(point => ({
          point,
          dist: manhattanDistance([y + startY, x + startX], point),
          value: matrix[point[1] - startX][point[0] - startY],
        }))
        .sort((a, b) => a.dist - b.dist);

      const closest = distances[0].dist === distances[1].dist ? null : distances[0]
      if (closest) {
        matrix[x][y] = closest.value;
      }
    }
  }

  const flatMatrix = matrix.reduce((flat, arr) => [...flat, ...arr], []).sort();
  const validPoints = pointsWithFiniteArea(coords, matrix, startX, startY, w, h);
  const validValues = validPoints.map(point => point.val);
  const counts = {};
  flatMatrix.forEach(val => {
    if (counts[val] || !validValues.includes(val)) return;

    counts[val] = flatMatrix.lastIndexOf(val) - flatMatrix.indexOf(val) + 1;
  });

  return Math.max(...Object.values(counts));
}

function manhattanDistance(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function claimedArea(point, other) {
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
  return points
    .filter(point =>
      point[0] - startX > 0 &&
      point[0] - startX < w - 1 &&
      point[1] - startY > 0 &&
      point[1] - startY < h - 1
    )
    .map(point => ({ point, val: matrix[point[1] - startY][point[0] - startX] }))
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
