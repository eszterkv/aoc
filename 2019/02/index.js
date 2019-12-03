const fs = require('fs');
const testing = Boolean(process.argv[1].match(/test$/));

if (!testing)
  fs.readFile('./inputs/02.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const input = data.trim();
    console.log(`Part 1: ${part1(input)}`);
    console.log(`Part 2: ${part2(input)}`);
  });

function part1(input) {
  const nums = input.split(',').map(n => Number(n));
  if (!testing) {
    nums[1] = 12;
    nums[2] = 2;
  }

  let idx = 0;
  while (true) {
    const opcode = nums[idx];
    if (opcode === 99) return nums[0];

    const [a, b, target] = [nums[idx + 1], nums[idx + 2], nums[idx + 3]];
    nums[target] = handleOp(opcode)(nums[a], nums[b]);
    idx += 4;
  }
}

function handleOp(code) {
  if (code === 1)
    return add;
  else if (code === 2)
    return multiply;
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

function part2(input) {
}

module.exports = { part1, part2 };
