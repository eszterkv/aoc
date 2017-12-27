const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/08.test');

class Register {
  constructor(name) {
    this.name = name;
    this.value = 0;
  }
  
  addValue(direction, value) {
    if (direction === 'inc') {
      this.value += value;
    } else this.value -= value;
  }
}

runTest(findLargestValue, tests.suite1);

fs.readFile('./inputs/08.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1 & 2: ${findLargestValue(input)}`);
});

function findLargestValue(input) {
  let registers = [];
  let highestValueHeld = 0;
  input.split('\n').map((instruction) => {
    const name = instruction.split(' ')[0];
    const register = registers.find((r) => r.name === name) || new Register(name);
    if (registers.indexOf(register) === -1) registers.push(register);

    const condition = instruction.split('if ')[1];
    let ok;
    if (condition) {
      const reg = registers.find((r) => r.name === condition.split(' ')[0]);
      const regValue = reg && reg.value || 0;
      const n = parseInt(condition.split(' ')[2]);
      switch (condition.split(' ')[1]) {
        case '==' || '===': ok = regValue == n; break;
        case '<': ok = regValue < n; break;
        case '<=': ok = regValue <= n; break;
        case '>': ok = regValue > n; break;
        case '>=': ok = regValue >= n; break;
        case '!=': ok = regValue != n; break;
      }
    }

    if (!condition || ok) {
      const direction = instruction.split(' ')[1];
      const value = parseInt(instruction.split(' ')[2]);
      register.addValue(direction, value);
      if (register.value > highestValueHeld) {
        highestValueHeld = register.value;
      }
    }
  });
  
  console.log('Highest value held:', highestValueHeld);
  return registers.find((r) => {
    return r.value == Math.max.apply(null, registers.map((r) => r.value));
  }).value;
}
