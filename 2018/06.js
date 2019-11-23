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

  for (let x = 0; x < h; x++) {
    for (let y = 0; y < w; y++) {
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
  const uniqValues = [...new Set(flatMatrix)];
  const validValues = valuesWithFiniteArea(uniqValues, matrix);
  const counts = {};
  uniqValues.forEach(val => {
    if (!validValues.includes(val)) return;

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
  const w = coords.reduce((size, curr) => Math.max(size, curr[1] - startY), -Infinity) + 1;
  const h = coords.reduce((size, curr) => Math.max(size, curr[0] - startX), -Infinity) + 1;

  const matrix = [];
  let row = Array(w).fill('.');
  for (let i = 0; i < h; i++) {
    matrix.push(row);
    row = row.slice(0);
  }
  coords.forEach((point, idx) => {
    matrix[point[0] - startX][point[1] - startY] = idx.toString();
  });

  return { coords, matrix, startX, startY, w, h };
}

function valuesWithFiniteArea(values, matrix) {
  const edges = [
    matrix[0],
    matrix.map(row => row[0]),
    matrix.map(row => row[row.length - 1]),
    matrix[matrix.length - 1],
  ];

  return values
    .filter(value =>
      !edges.some(edge => edge.includes(value))
    );
}
