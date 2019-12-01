const fs = require('fs');
const testing = Boolean(process.argv[1].match(/test$/));

if (!testing)
  fs.readFile('./inputs/01.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const input = data.trim();
    console.log(`Part 1: ${part1(input)}`);
    console.log(`Part 2: ${part2(input)}`);
  });

function part1(input) {
  return input.split('\n')
    .reduce((total, part) => total + calculateFuelRequired(part), 0);
}

function part2(input) {
  return input.split('\n')
    .reduce((total, part) => total + calculateRecursiveRequired(part), 0);
}

function calculateFuelRequired(mass) {
  return Math.floor(mass / 3) - 2;
}

function calculateRecursiveRequired(mass, fuel = 0) {
  const fuelRequired = calculateFuelRequired(mass);
  if (fuelRequired < 1)
    return fuel;

  return calculateRecursiveRequired(fuelRequired, fuel + fuelRequired);
}

module.exports = { part1, part2 };
