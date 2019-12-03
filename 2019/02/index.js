const fs = require('fs');
const testing = Boolean(process.argv[1].match(/test$/));

if (!testing)
  fs.readFile('./inputs/02.txt', 'utf8', (err, data) => {
    if (err) throw err;
    const input = data.trim();
    console.log(`Part 1: ${part1(input.split(',').map(n => Number(n)), [12, 2])}`);
    console.log(`Part 2: ${part2(input)}`);
  });

function part1(nums, memory = null) {
  if (memory) {
    nums[1] = memory[0];
    nums[2] = memory[1];
  }

  let pointer = 0;
  while (true) {
    const opcode = nums[pointer];
    if (opcode === 99) return nums[0];

    const [a, b, target] = [nums[pointer + 1], nums[pointer + 2], nums[pointer + 3]];
    nums[target] = handleOp(opcode)(nums[a], nums[b]);
    pointer += 4;
  }
}

function part2(input) {
  const nums = input.split(',').map(n => Number(n));

  while (true)
    for (let noun = 0; noun < 100; noun++)
      for (let verb = 0; verb < 100; verb++)
        if (part1([...nums], [noun, verb]) === 19690720)
          return 100 * noun + verb;
}

function handleOp(code) {
  if (code === 1)
    return add;
  else if (code === 2)
    return multiply;
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

module.exports = { part1, part2 };
