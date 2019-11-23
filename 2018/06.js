const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/06.test');

runTest(solve, tests.suite1);
//runTest(solve2, tests.suite2);

fs.readFile('./inputs/06.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${solve(input)}`);
//  console.log(`Part 2: ${solve2(input)}`);
});

function solve(input) {
  const { coords, matrix, startX, startY, w, h } = parseCoords(input);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (matrix[x][y] !== '.')
        continue;

      const distances = coords
        .map(point => {
          return ({
          point,
          dist: manhattanDistance([x + startX, y + startY], point),
          value: matrix[point[0] - startX][point[1] - startY],
        })})
        .sort((a, b) => a.dist - b.dist);

      const closest = distances[0].dist === distances[1].dist ? null : distances[0]
      if (closest) {
        matrix[x][y] = closest.value;
      }
    }
  }

  const flatMatrix = matrix.reduce((flat, arr) => [...flat, ...arr], []).sort();
  const validValues = valuesWithFiniteArea(coords, matrix, startX, startY, w, h);
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

function printMatrix(matrix) {
  console.log(matrix.map(row => row.join('')).join('\n'));
}

function parseCoords(input) {
  const coords = input
    .split('\n')
    .map(line => line.split(', ').map(coord => parseInt(coord)));

  const startX = coords.reduce((start, curr) => Math.min(start, curr[0]), Infinity);
  const startY = coords.reduce((start, curr) => Math.min(start, curr[1]), Infinity);
  const w = coords.reduce((size, curr) => Math.max(size, curr[0] - startX), -Infinity) + 1;
  const h = coords.reduce((size, curr) => Math.max(size, curr[1] - startY), -Infinity) + 1;

  const matrix = [];
  let row = Array(w).fill('.');
  for (let i = 0; i < h; i++) {
    matrix.push(row);
    row = row.slice(0);
  }
  coords.forEach((point, idx) => {
    matrix[point[1] - startY][point[0] - startX] = idx.toString();
  });

  return { coords, matrix, startX, startY, w, h };
}

function valuesWithFiniteArea(points, matrix, startX, startY, w, h) {
  return points
    .filter(point =>
      point[0] - startX > 0 &&
      point[0] - startX < w - 1 &&
      point[1] - startY > 0 &&
      point[1] - startY < h - 1
    )
    .map(point => matrix[point[1] - startY][point[0] - startX]);
}
