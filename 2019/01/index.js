const fs = require('fs');
const testing = Boolean(process.argv[1].match(/test$/));

if (!testing) {
  fs.readFile('./inputs/01.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const input = data.trim();
    console.log(`Part 1: ${part1(input)}`);
    console.log(`Part 2: ${part2(input)}`);
  });
}

function part1(input) {
  return input.split('\n').reduce((total, module) => total + calculateFuelRequired(module), 0);
}

function part2(input) {}

function calculateFuelRequired(mass) {
  return Math.floor(mass / 3) - 2;
}

module.exports = { part1, part2 };
