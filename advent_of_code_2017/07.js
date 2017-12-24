const fs = require('fs');
const runTest = require('./test');
const tests = require('./tests/07.test');

class Program {
  constructor(programDef) {
    this.name = programDef.split(' ')[0];
    this.weight = parseInt(programDef.split('(')[1].split(')')[0]);
    this.children = this.createChildrenOrNone(programDef);
  }

  createChildrenOrNone(programDef) {
    return programDef.indexOf('->') > -1
      ? programDef.split('-> ')[1].split(', ') : null;
  }
  
  calculateTowerWeight(programs) {
    this.towerWeight = calculateTowerWeight(programs, this);
  }
}

runTest(findRootProgram, tests.suite1);
runTest(findRootProgramPart2, tests.suite2);

fs.readFile('./inputs/07.input', 'utf8', (err, data) => {
  if (err) throw err;
  const input = data.trim();
  console.log(`Part 1: ${findRootProgram(input)}`);
  console.log(`Part 2: ${findRootProgramPart2(input)}`);
});

function findRootProgram(input) {
  const programs = input.split('\n')
                        .map((line) => new Program(line))
                        .filter((p) => !!p.children);
  const children = programs.map((p) => p.children)
                           .reduce((prev, curr) => prev.concat(curr));
  return programs.filter((p) => children.indexOf(p.name) === -1)[0].name;
}

function findRootProgramPart2(input) {
  const programs = input.split('\n')
                        .map((line) => new Program(line));
  programs.forEach((p) => p.calculateTowerWeight(programs));
  const root = programs.find((p) => p.name === findRootProgram(input));
  return(isBalanced(programs, root));
}

function isBalanced(programs, root) {
  if (!!root.children) {
    const children = root.children.map((child) => programs.find((p) => p.name == child));
    const weights = children.map((c) => c.towerWeight);
    const balanced = !(children.map((c) => isBalanced(programs, c)).some((p) => p == false))
      && weights[0] === weights[weights.length - 1];
    if (!balanced) {
      const badProgram = children.find((c) => {
        const badWeight = weights.find((w) => weights.indexOf(w) == weights.lastIndexOf(w));
        return c.towerWeight === badWeight;
      });
      const goodTowerWeight = weights[0] == weights[1] ? weights[0] : weights[weights.length - 1];
      const diff = goodTowerWeight - badProgram.towerWeight;
      console.log(badProgram.weight + diff);
      return badProgram.weight + diff;
    }
  }
}

function calculateTowerWeight(programs, root) {
  if (!!root.children) {
    const children = root.children.map((child) => programs.find((p) => p.name == child));
    const tw = root.weight + children.map((c) => {
      return calculateTowerWeight(programs, c);
    }).reduce((prev, curr) => prev + curr);
    return tw;
  } else {
    return root.weight;
  }
}
