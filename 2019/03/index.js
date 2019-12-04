const fs = require('fs');
const testing = Boolean(process.argv[1].match(/test$/));

if (!testing)
  fs.readFile('./inputs/03.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const input = data.trim();
    console.log(`Part 1: ${part1(input)}`);
    console.log(`Part 2: ${part2(input)}`);
  });

function part1(input) {
  const wires = input.split('\n');
  const [path1, path2] = wires.map(wire => processPath(wire));
  const crossings = [...path1]
    .filter(point => path2.has(point))
    .map(point => point.split(',').map(Number))
    .sort((a, b) => manhattan(a) - manhattan(b));
  return manhattan(crossings[0])
}

function part2(input) {
}

function processPath(wire) {
  let [x, y] = [0, 0];
  const path = new Set();

  wire.split(',').forEach(section => {
    const direction = section[0];
    const steps = Number(section.substr(1));
    for (let step = 0; step < steps; step++) {
      if (direction === 'U')
        y++;
      if (direction === 'D')
        y--;
      if (direction === 'L')
        x--;
      if (direction === 'R')
        x++;

      path.add(`${x},${y}`);
    }
  });

  return path;
}

const manhattan = (a, b = [0, 0]) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

module.exports = { part1, part2 };
